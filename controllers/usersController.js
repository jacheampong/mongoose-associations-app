const router = require('express').Router();
// const User = require('../models/user').User;
// const Tweet = require('../models/user').Tweet;

const { User, Tweet} = require('../models/user')


// NEW USER FORM
router.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

//USER INDEX PAGE
router.get('/', (req, res) => {

  // find all users
  User.find({}, (error, users) => {
    console.log(`${users}`)
    res.render('users/index.ejs', { users });
  });

});

// CREATE A NEW USER
router.post('/', (req, res) => {
  User.create(req.body, (error, user) => {
    res.redirect('/users/${user.id}')
  });
});

// ADD EMPTY FORM TO USER SHOW PAGE TO ADD TWEET TO A USER
router.get('/:userId', (req, res) => {
    // find user in db by id and add new tweet
    User.findById(req.params.userId, (error, user) => {
        res.render('users/show.ejs', { user });
    });
});

// CREATE TWEET EMBEDDED IN USER
router.post('/:userId/tweets', (req, res) => {
  console.log(req.body);
  // store new tweet in memory with data from request body
  const newTweet = new Tweet({ tweetText: req.body.tweetText });
  // find user in db by id and add new tweet
  User.findById(req.params.userId, (error, user) => {
    user.tweets.push(newTweet);
    user.save((err, user) => {
      res.redirect(`/users/${user.id}`);
    });
  });
});

// EDIT TWEET 
router.get('/:userId/tweets/:tweetId/edit', (req, res) => {
  // set the value of the user and tweet ids
  const userId = req.params.userId;
  const tweetId = req.params.tweetId;
  // find user in db by id
  User.findById(userId, (err, foundUser) => {
    // find tweet embedded in user
    const foundTweet = foundUser.tweets.id(tweetId);
    // update tweet text and completed with data from request body
    res.render('tweets/edit.ejs', { foundUser, foundTweet });
  });
});

// UPDATE TWEET EMBEDDED IN A USER DOCUMENT
router.put('/:userId/tweets/:tweetId', (req, res) => {
  console.log('PUT ROUTE');
  // set the value of the user and tweet ids
  const userId = req.params.userId;
  const tweetId = req.params.tweetId;

  // find user in db by id
  User.findById(userId, (err, foundUser) => {
    // find tweet embedded in user
    const foundTweet = foundUser.tweets.id(tweetId);
    // update tweet text and completed with data from request body
    foundTweet.tweetText = req.body.tweetText;
    foundUser.save((err, savedUser) => {
      res.redirect(`/users/${foundUser.id}`);
    });
  });
});

router.delete('/:userId/tweets/:tweetId', (req, res) => {
  console.log('DELETE TWEET');
  // set the value of the user and tweet ids
  // const userId = req.params.userId;
  // const tweetId = req.params.tweetId;

  const { userId, tweetId } = req.params

  // find user in db by id
  User.findById(userId, (err, foundUser) => {

    // find tweet embedded in user - mongoose feature
    foundUser.tweets.id(tweetId).remove();
    // update tweet text and completed with data from request body
    foundUser.save((err, savedUser) => {
      res.redirect(`/users/${foundUser.id}`);
    });
  });
});


module.exports = router;
