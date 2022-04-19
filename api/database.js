const sql = require("mssql");
const fs = require("fs/promises");
let config;

const readConfig = async () => {
    try {
        const data = await fs.readFile("./api/config.json");
        config = JSON.parse(data);
    } catch(err) {
        process.stdout.write(`Error reading config\n${err}\n`);
    }
}

const makeQuery = async (queryString) => {
    let result = null;
    let db;
    try {
        if (config) {
            let db = await sql.connect(config);
            result = await sql.query(queryString);
            if (result) process.stdout.write("SQL command completed\n");
        } else {
            process.stdout.write("Error loading config");
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
        Quantity int NOT NULL
    )`);
}

const getRecipeIngredients = async (recipeID) => {
    let result = await makeQuery(`SELECT i.Name, ri.Quantity, i.Unit, i.Category FROM Ingredients i
        JOIN RecipeIngredients ri ON i.IngredientID = ri.IngredientID
        WHERE ri.RecipeID=${recipeID}`);
    let ingredients = [];
    result.recordset.forEach((record) => {
        ingredients.push({"Name": record.Name, "Quantity": record.Quantity, "Unit": record.Unit, "Category": record.Category})
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
    await readConfig();
    let result = await getRecipeIngredients(1);
    process.stdout.write(JSON.stringify(result));
}

main();