import Request from "../../requests";
import { RestMethod } from "../../interfaces";

export default class IngredientListAPI {

    static getAllIngredients = async () => {
        let response = await Request("http://localhost:5000/ingredients/", RestMethod.GET, {});
        if (response.ok) {
            return response.json();
        }
        return response.text();
    }
}