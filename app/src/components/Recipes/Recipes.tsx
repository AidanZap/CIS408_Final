import React from 'react';
import { Stack, Button, Divider } from "@mui/material";
import { Recipe } from "../../interfaces";
import RecipeCardGrid from "./RecipeCardGrid";

interface IProps {

}

const Recipes: React.FC<IProps> = (props: IProps) => {

    const testRecipes = [{recipeID: 1, name: "sauce"}, {recipeID: 2, name: "meatballs"},
                            {recipeID: 3, name: "sauce"}, {recipeID: 4, name: "meatballs"},
                            {recipeID: 5, name: "sauce"}, {recipeID: 6, name: "meatballs"},
                            {recipeID: 7, name: "sauce"}, {recipeID: 8, name: "meatballs"}];

    const [recipes, setRecipes] = React.useState<Recipe[]>(testRecipes);

    const editRecipe = (recipeID: number) => {
        console.log(recipeID);
    }

    return <Stack direction="column" divider={<Divider orientation="horizontal" />} spacing={3}>
        <Stack direction="row" spacing={3} sx={{mt: 3}}>
            <Button variant="contained" color="secondary">Create Recipe</Button>
        </Stack>
        <RecipeCardGrid recipes={recipes} editRecipe={editRecipe} />
    </Stack>;
}

export default Recipes;