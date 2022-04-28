import React from 'react';
import { Stack, Typography, Divider, Button } from "@mui/material";
import Increment from "./Increment";
import { Recipe } from "../../interfaces";
import GroceryCardGrid from "./GroceryCardGrid";

interface IProps {

}

const GroceryList: React.FC<IProps> = (props: IProps) => {

    const testRecipes = [{recipeID: 1, name: "sauce"}, {recipeID: 2, name: "meatballs"},
                            {recipeID: 3, name: "sauce"}, {recipeID: 4, name: "meatballs"},
                            {recipeID: 5, name: "sauce"}, {recipeID: 6, name: "meatballs"},
                            {recipeID: 7, name: "sauce"}, {recipeID: 8, name: "meatballs"}];

    const [numberOfMeals, setNumberOfMeals] = React.useState<number>(5);
    const [recipes, setRecipes] = React.useState<Recipe[]>(testRecipes);
    const [selectedRecipes, setSelectedRecipes] = React.useState<Record<string, number>>({});

    const changeRecipeQuantity = (recipeID: number, amount: number) => {
        if (recipeID in selectedRecipes) {
            let currentAmount = selectedRecipes[recipeID];
            if (currentAmount + amount < 1) {
                setSelectedRecipes({...(delete selectedRecipes[recipeID] && selectedRecipes)});
            } else {
                setSelectedRecipes({...selectedRecipes, [recipeID]: currentAmount + amount});
            }
        } else {
            if (amount < 1) return;
            setSelectedRecipes({...selectedRecipes, [recipeID]: amount});
        }
    }

    return <Stack direction="column" divider={<Divider orientation="horizontal" />} spacing={3}>
        <Stack direction="row" spacing={3} sx={{mt: 3}}>
            <Typography variant="h4">Number of Meals:</Typography>
            <Increment currentValue={numberOfMeals} updateFunction={(num: number) => setNumberOfMeals(numberOfMeals + num)} />
            <Button variant="contained" color="secondary">Create groceryList</Button>
        </Stack>
        <GroceryCardGrid recipes={recipes} selectedRecipes={selectedRecipes} changeQuantity={changeRecipeQuantity} />
    </Stack>;
}

export default GroceryList;