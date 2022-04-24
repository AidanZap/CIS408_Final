import Request from "../../requests";
import { RestMethod, Ingredient } from "../../interfaces";

export default class IngredientListAPI {

    static getIngredientList = async (recipeID: string) => {
        let response = await Request("http://localhost:5000/recipeIngredient/", RestMethod.GET, {"recipeID": recipeID});
        if (response.ok) {
            return response.json();
        }
        return response.text();
    }

    static insertIngredientList = async (recipeID: string, ingredients: Ingredient[]) => {
        for (const ingredient of ingredients) {
            await Request(
                "http://localhost:5000/recipeIngredient/",
                RestMethod.POST,
                {"recipeID": recipeID, "ingredientID": ingredient.ingredientID, "quantity": ingredient.quantity}
            );
        }
    }

    static deleteIngredientList = async (recipeID: string, ingredientID: string) => {
        let response = await Request(
            "http://localhost:5000/recipeIngredient/",
            RestMethod.DELETE,
            {"recipeID": recipeID, "ingredientID": ingredientID}
        );
        if (response.ok) {
            return response.json();
        }
        return response.text();
    }
}

