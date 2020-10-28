const router = require('express').Router();
const Food = require('../models/food');
const Ingredient = require('../models/ingredient');

router.get('/', async (req, res) => {
    let foods = await Food.find({})
    // res.send(foods)
    res.render('foods/index.ejs', { foods });
})

router.get('/new', async (req, res) => {
    let allIngredients = await Ingredient.find({})
    res.render('foods/new.ejs', { ingredients: allIngredients });
});

router.get('/:id', async (req, res) => {
    let allIngredients = await Ingredient.find({})

    let foundFood = await Food.findById(req.params.id).populate('ingredients')
    res.render('foods/show.ejs', { 
        food: foundFood,
        ingredients: allIngredients
    } )
})

router.post('/', async (req, res) => {
  let food = await Food.create(req.body);
  res.redirect(`/foods/${food.id}`);
});

router.put('/:foodId/ingredients', async (req, res) => {
    let foundFood = await Food.findByIdAndUpdate(req.params.foodId, {
        $push: {
            ingredients: req.body.ingredients,
        },
    },
    { new: true, upsert: true }
    );
    console.log(foundFood);
    res.redirect(`/foods/${foundFood.id}`);
});


module.exports = router;