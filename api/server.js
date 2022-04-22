const express = require('express');
const db = require('./database');
const app = express();
db.initDatabase();
const PORT = 5000

// Endpoints for Ingredients Table 

const ingredientRouter = express.Router();
app.use('/ingredient', ingredientRouter);

ingredientRouter.get("/", async (req, res) => {
    let ingredientID = req.query.ingredientID;
    if(!ingredientID) {
        res.status("400").send("Endpoint reuires ingredientID");
        return;
    }
    let result = await db.getRecipeIngredients(ingredientID)
    if (!result) {
        res.status("500").send("Database error");
        return;
    }
    res.status("200").send(result);
    
});

ingredientRouter.post("/", (req, res) => {
    let ingredientID = req.query.ingredientID;
    let name = req.query.name;
    let unit = req.query.unit;
    let category = req.query.category;
    if (!ingredientID|| !name || !unit || !category) {
        res.status("400").send("Endpoint requires: ingredientID, name, unit, and category");
        return;
    }
    let result = await db.insertIngredients(ingredientID, name, unit, category);
    if (!result) {
        res.status("500").send("Database error");
        return;
    }
    res.sendStatus("200");
});

ingredientRouter.delete("/", (req, res) =>{
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

})

// Endpoints for Recipes Table

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

// Endpoints for Recipe Ingredients Table 

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