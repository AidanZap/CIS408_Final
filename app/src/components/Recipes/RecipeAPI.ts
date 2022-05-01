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

    static insertRecipe = async (name: string, ingredients: RecipeIngredient[]) => {
        let params = {"name": name, "ingredients": ingredients};
        let response = await Request("http://localhost:5000/recipes", RestMethod.POST, params);
        if (response.ok) {
            return await this.getAllRecipes();
        }
        throw new Error(await response.text());
    }
}