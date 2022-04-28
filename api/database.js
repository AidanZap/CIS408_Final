const sql = require("mssql/msnodesqlv8");
const fs = require("fs/promises");
let config;

const initDatabase = async () => {
    try {
        const data = await fs.readFile("./api/example_config.json");
        config = JSON.parse(data);
        process.stdout.write("Config loaded properly, database ready!\n");
    } catch(err) {
        process.stdout.write(`Error reading config\n${err}\n`);
    }
}

const makeQuery = async (queryString) => {
    let result = null;
    let db;
    try {
        if (config) {
            db = await sql.connect(config);
            result = await sql.query(queryString);
            if (result) process.stdout.write("SQL command completed\n");
        } else {
            process.stdout.write("Error loading config\n");
        }
    } catch (err) {
        process.stdout.write(`Error executing SQL\n${err}\n`);
    } 
    finally {
        if (db) await db.close();
    }
    return result;
}

const createTables = async () => {
    await makeQuery(`CREATE TABLE Ingredients (
        IngredientID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
        Name nvarchar(255) NOT NULL UNIQUE,
        Unit nvarchar(64) NOT NULL,
        Category nvarchar(255) NOT NULL
    )`);
    await makeQuery(`CREATE TABLE Recipes (
        RecipeID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
        Name nvarchar(255) UNIQUE
    )`);
    await makeQuery(`CREATE TABLE RecipeIngredients (
        RecipeID int NOT NULL FOREIGN KEY REFERENCES Recipes(RecipeID),
        IngredientID int NOT NULL FOREIGN KEY REFERENCES Ingredients(IngredientID),
        Quantity int NOT NULL,
        CONSTRAINT unique_recipe_ingredient UNIQUE CLUSTERED 
        (
            RecipeID, IngredientID
        )
    )`);
}

const getIngredients = async (ingredientID) => {
    let result = await makeQuery(`SELECT ri.Name, i.Unit, i.Category WHERE ri.IngredientID=${ingredientID}`);
    let ingredients =[];
    result.recordset.forEach((record) => {
        ingredients.push({"Name": record.Name, "Unit": record.Unit, "Category": record.Category})})
        return ingredients;

const insertBaseIngredients = async () => {
    try {
        const data = JSON.parse(await fs.readFile("./api/base_ingredients.json"));
        data.forEach((i) => {
            //process.stdout.write(`${i["name"]} | ${i["unit"]} | ${i["category"]}\n`)
            //TODO Call ingredient insert here
        });
    } catch(err) {
        process.stdout.write(`Error reading base recipes\n${err}\n`);
    }

const insertIngredients = async (name, unit, category) => {
    return await makeQuery(`INSERT INTO Ingredients (Name, Unit, Category)
        VALUES ('${name}', '${unit}', '${category}')`);
}
const deleteIngredients = async (ingredientID) => {
    return await makeQuery(`DELETE FROM Recipes WHERE IngredientID = ${ingredientID}`);
}

const getRecipes = async (recipeID) => {
    let result = await makeQuery(`SELECT ri.Name, ri.RecipeID WHERE ri.RecipeID=${recipeID}`);
    let recipes = [];
    result.recordset.forEach((record) => {
        recipes.push({"Name": record.Name})})
        return recipes;
}
const insertRecipes = async (name) => {
    return await makeQuery(`INSERT INTO Recipes (Name) VALUES ('${name}')`);
}

const deleteRecipes = async (recipeID) => {
    return await makeQuery(`DELETE FROM Recipes WHERE RecipeID = ${recipeID}`);
}

const getRecipeIngredients = async (recipeID) => {
    let result = await makeQuery(`SELECT i.IngredientID, i.Name, ri.Quantity, i.Unit, i.Category FROM Ingredients i
        JOIN RecipeIngredients ri ON i.IngredientID = ri.IngredientID
        WHERE ri.RecipeID=${recipeID}`);
    let ingredients = [];
    result.recordset.forEach((record) => {
        ingredients.push({"IngredientID": record.IngredientID, "Name": record.Name, "Quantity": record.Quantity, "Unit": record.Unit, "Category": record.Category})
    })
    return ingredients;
}

const insertRecipeIngredient = async (recipeID, ingredientID, quantity) => {
    return await makeQuery(`INSERT INTO RecipeIngredients (RecipeID, IngredientID, quantity) 
        VALUES (${recipeID}, ${ingredientID}, ${quantity})`);
}

const deleteRecipeIngredient = async (recipeID, ingredientID) => {
    return await makeQuery(`DELETE FROM RecipeIngredients 
        WHERE RecipeID = ${recipeID} AND IngredientID = ${ingredientID}`);
}

const main = async () => {
    await initDatabase();
}

// main();

module.exports = {
    initDatabase, getRecipeIngredients, insertRecipeIngredient, deleteRecipeIngredient, getRecipes, 
    insertRecipes, deleteRecipes, getIngredients, insertIngredients, deleteIngredients
};