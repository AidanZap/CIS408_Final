const express = require('express');
const db = require('./database');
const app = express();
db.initDatabase();
const PORT = 5000
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Endpoints for Ingredients Table 

const ingredientRouter = express.Router();
app.use('/ingredients', ingredientRouter);

ingredientRouter.get("/", async (req, res) => {
    let result = await db.getIngredients()
    if (!result) {
        res.status("500").send("Database error");
        return;
    }
    res.status("200").send(result);
});

ingredientRouter.post("/", async (req, res) => {
    let name = req.query.name;
    let unit = req.query.unit;
    let category = req.query.category;
    if (!name || !unit || !category) {
        res.status("400").send("Endpoint requires: ingredientID, name, unit, and category");
        return;
    }
    let result = await db.insertIngredients(name, unit, category);
    if (!result) {
        res.status("500").send("Database error");
        return;
    }
    res.sendStatus("200");
});

ingredientRouter.delete("/", async (req, res) =>{
    let ingredientID = req.query.ingredientID;
    if (!ingredientID) {
        res.status("400").send("Endpoint requires ingredentID");
        return;
    }
    let result = await db.deleteIngredients(ingredientID);
    if (!result) {
        res.status("500").send("Database error");
        return;
    }
    res.sendStatus("200");

});

// Endpoints for Recipes Table

const recipeRouter = express.Router();
app.use('/recipes', recipeRouter);

recipeRouter.get("/", async (req, res) => {
    let result = await db.getRecipes();
    if (!result) {
        res.status("500").send("Database error");
        return;
    }
    res.status("200").send(result);
});

recipeRouter.get("/groceryList", async (req, res) => {
    let recipeSelections = JSON.parse(req.query.selections);

    if(!recipeSelections) {
        res.status("400").send("Endpoint requires selections");
        return;
    }

    let result = await db.createGroceryList(recipeSelections);
    if (!result) {
        res.status("500").send("Database error");
        return;
    }
    res.status("200").send(result);
})

recipeRouter.post("/", async (req, res) => {
    let name = req.query.name;
    let ingredients = JSON.parse(req.query.ingredients);

    if(!name || !ingredients) {
        res.status("400").send("Endpoint requires name and ingredients");
        return;
    }
    let result = await db.insertRecipe(name, ingredients);
    if (!result) {
        res.status("500").send("Database error");
        return;
    }
    res.sendStatus("200");
});

recipeRouter.delete("/", async (req, res) => {
    let recipeID = req.query.recipeID;
    if (!recipeID) {
        res.status("400").send("Endpoint requires recipeID");
        return;
    }
    let result = await db.deleteRecipes(recipeID);
    if (!result) {
        res.status("500").send("Database error");
        return;
    }
    res.sendStatus("200");
});

// Init Server

app.listen(PORT, () => {
    process.stdout.write(`Listening on port ${PORT}\n`);
})