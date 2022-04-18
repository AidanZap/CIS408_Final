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
        Name nvarchar(255) NOT NULL,
        Unit nvarchar(64) NOT NULL,
        Category nvarchar(255) NOT NULL
    )`);
    await makeQuery(`CREATE TABLE Recipes (
        RecipeID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
        Name nvarchar(255)
    )`);
    await makeQuery(`CREATE TABLE RecipeIngredients (
        RecipeID int NOT NULL FOREIGN KEY REFERENCES Recipes(RecipeID),
        IngredientID int NOT NULL FOREIGN KEY REFERENCES Ingredients(IngredientID),
        Quantity int NOT NULL
    )`);
}

const main = async () => {
    await readConfig();
    await createTables();
}

main();