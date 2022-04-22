const express = require('express');
const db = require('./database');
const app = express();
db.initDatabase();
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

recipeRouter.get("/", async (req, res) => {
    let recipeID = req.query.recipeID;
    if(!recipeID) {
        res.status("400").send("Endpoint requires recipeID");
        return;
    }
    let result = await db.getRecipes(recipeID)
    if (!result) {
        res.status("500").send("Database error");
        return;
    }
    res.status("200").send(result);

});

recipeRouter.post("/", async (req, res) => {
    let recipeID = req.query.recipeID;
    let name = req.query.name;

    if(!recipeID || !name) {
        res.status("400").send("Endpoint requires recipeID and name");
        return;
    }

    let result = await db.insertRecipes(recipeID, name);
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
})

// Recipe Ingredients

const recipeIngredientRouter = express.Router();
app.use('/recipeIngredient', recipeIngredientRouter);

recipeIngredientRouter.get("/", async (req, res) => {
    let recipeID = req.query.recipeID;
    if (!recipeID) {
        res.status("400").send("Endpoint requires recipeID");
        return;
    }
    let result = await db.getRecipeIngredients(recipeID)
    if (!result) {
        res.status("500").send("Database error");
        return;
    }
    res.status("200").send(result);
});

recipeIngredientRouter.post("/", async (req, res) => {
    let recipeID = req.query.recipeID;
    let ingredientID = req.query.ingredientID;
    let quantity = req.query.quantity;
    if (!recipeID || !ingredientID || !quantity) {
        res.status("400").send("Endpoint requires recipeID, ingredientID, and quantity");
        return;
    }
    let result = await db.insertRecipeIngredient(recipeID, ingredientID, quantity);
    if (!result) {
        res.status("500").send("Database error");
        return;
    }
    res.sendStatus("200");
});

recipeIngredientRouter.delete("/", async (req, res) => {
    let recipeID = req.query.recipeID;
    let ingredientID = req.query.ingredientID;
    if (!recipeID || !ingredientID) {
        res.status("400").send("Endpoint requires recipeID, and ingredientID");
        return;
    }
    let result = await db.deleteRecipeIngredient(recipeID, ingredientID);
    if (!result) {
        res.status("500").send("Database error");
        return;
    }
    res.sendStatus("200");
})

// Init Server

app.listen(PORT, () => {
    process.stdout.write(`Listening on port ${PORT}\n`);
})