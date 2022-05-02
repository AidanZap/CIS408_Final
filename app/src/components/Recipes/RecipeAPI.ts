import Request from "../../requests";
import { RecipeIngredient, RestMethod } from "../../interfaces";

export default class RecipeAPI {

    static getAllRecipes = async () => {
        let response = await Request("http://localhost:5000/recipes", RestMethod.GET, {});
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.text());
    }

    static getGroceryList = async (selections: Record<string, number>) => {
        let params = {"selections": JSON.stringify(selections)};
        let response = await Request("http://localhost:5000/recipes/groceryList", RestMethod.GET, params);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.text());
    }

    static insertRecipe = async (name: string, ingredients: RecipeIngredient[]) => {
        let params = {"name": name, "ingredients": JSON.stringify(ingredients)};
        let response = await Request("http://localhost:5000/recipes", RestMethod.POST, params);
        if (response.ok) {
            return await this.getAllRecipes();
        }
        throw new Error(await response.text());
    }
}