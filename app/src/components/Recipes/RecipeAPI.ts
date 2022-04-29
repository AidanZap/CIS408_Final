import Request from "../../requests";
import { RestMethod } from "../../interfaces";

export default class RecipeAPI {

    static getRecipes = async () => {
        let response = await Request("http://localhost:5000/recipes", RestMethod.GET, {});
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.text());
    }
}