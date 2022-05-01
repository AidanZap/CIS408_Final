import React from 'react';
import { Stack, Typography, Divider, Button } from "@mui/material";
import Increment from "./Increment";
import { Recipe } from "../../interfaces";
import RecipeAPI from "../Recipes/RecipeAPI";
import GroceryCardGrid from "./GroceryCardGrid";

interface IProps {

}

const GroceryList: React.FC<IProps> = (props: IProps) => {

    const [numberOfMeals, setNumberOfMeals] = React.useState<number>(5);
    const [recipes, setRecipes] = React.useState<Recipe[] | null>(null);
    const [selectedRecipes, setSelectedRecipes] = React.useState<Record<string, number>>({});

    React.useEffect(() => {
        let isMounted = true;
        RecipeAPI.getAllRecipes().then((result: Recipe[]) => {
            if (isMounted) {
                setRecipes(result);
            }
        }).catch((er: Error) => {
            console.log(`Error fetching Recipes | ${er}`);
        });
        return () => { isMounted = false; }
    }, []);

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