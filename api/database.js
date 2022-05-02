const sql = require("mssql/msnodesqlv8");
const fs = require("fs/promises");
let config;

const initDatabase = async () => {
    try {
        const data = await fs.readFile("./api/config.json");
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

const getIngredients = async () => {
    let result = await makeQuery("SELECT IngredientID, Name, Unit, Category FROM Ingredients");
    let ingredients =[];
    result.recordset.forEach((record) => {
        ingredients.push({"ingredientID": record.IngredientID, "name": record.Name, "unit": record.Unit, "category": record.Category});
    });
    return ingredients;
}

const insertBaseIngredients = async () => {
    try {
        const data = JSON.parse(await fs.readFile("./api/base_ingredients.json"));
        for (const i of data) {
            await insertIngredient(i["name"], i["unit"], i["category"]);
        }
    } catch(err) {
        process.stdout.write(`Error reading base recipes\n${err}\n`);
    }
}

const insertIngredient = async (name, unit, category) => {
    return await makeQuery(`INSERT INTO Ingredients (Name, Unit, Category)
        VALUES ('${name}', '${unit}', '${category}')`);
}
const deleteIngredient = async (ingredientID) => {
    return await makeQuery(`DELETE FROM Recipes WHERE IngredientID = ${ingredientID}`);
}

const getRecipes = async () => {
    let result = await makeQuery("SELECT RecipeID, [Name] FROM Recipes");
    let recipes = [];
    for (const recipe of result.recordset) {
        let ingredients = await getRecipeIngredients(recipe.RecipeID);
        recipes.push({"recipeID": recipe.RecipeID, "name": recipe.Name, "ingredients": ingredients});
    }
    return recipes;
}

const createGroceryList = async (selections) => {
    let groceryList = []
    for (const recipeID in selections) {
        let amount = selections[recipeID];
        let result = await getRecipeIngredients(recipeID);
        result.forEach((recipeIngredient) =>  {
            let index = groceryList.findIndex((i) => i.ingredientID === recipeIngredient.ingredientID);
            if (index === -1) {
                groceryList.push({...recipeIngredient, quantity: recipeIngredient.quantity * amount});
            } else {
                groceryList[index].quantity = groceryList[index].quantity + (recipeIngredient.quantity * amount);
            }
        });
    }
    return groceryList;
}

const insertRecipe = async (name, ingredients) => {
    let result = await makeQuery(`INSERT INTO Recipes (Name) VALUES ('${name}')`);
    if (!result || result === null) return result;
    let newRecipeID = await makeQuery(`SELECT RecipeID FROM Recipes WHERE Name='${name}'`);
    newRecipeID = newRecipeID.recordset[0].RecipeID;
    for (let i=0; i<ingredients.length; i++) {
        let ingredient = ingredients[i];
        await insertRecipeIngredient(newRecipeID, ingredient.ingredientID, ingredient.quantity);
    }
    return newRecipeID;
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
        ingredients.push({"ingredientID": record.IngredientID, "name": record.Name, "quantity": record.Quantity, "unit": record.Unit, "category": record.Category})
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
    await insertBaseIngredients();
}

main();

module.exports = {
    initDatabase, createGroceryList,
    getRecipeIngredients, insertRecipeIngredient, deleteRecipeIngredient,
    getRecipes, insertRecipe, deleteRecipes,
    getIngredients, insertIngredient, deleteIngredient
};