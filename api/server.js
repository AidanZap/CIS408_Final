const express = require('express');
const app = express();
const PORT = 5000

// Ingredients

const ingredientRouter = express.Router();
app.use('/ingredient', ingredientRouter);

ingredientRouter.post("/", (req, res) => {
    let payload = req.body;
    process.stdout.write(`POSTING | ${payload}\n`);
    res.sendStatus(200);
})

// Recipes

const recipeRouter = express.Router();
app.use('/recipe', recipeRouter);

recipeRouter.post("/", (req, res) => {
    let payload = req.body;
    process.stdout.write(`POSTING | ${payload}\n`);
    res.sendStatus(200);
})

// Recipe Ingredients

const recipeIngredientRouter = express.Router();
app.use('/recipeIngredient', recipeIngredientRouter);

recipeIngredientRouter.post("/", (req, res) => {
    let payload = req.body;
    process.stdout.write(`POSTING | ${payload}\n`);
    res.sendStatus(200);
})

// Init Server

app.listen(PORT, () => {
    process.stdout.write(`Listening on port ${PORT}\n`);
})