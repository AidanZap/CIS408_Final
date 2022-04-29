import React from 'react';
import { Stack, Button, Divider } from "@mui/material";
import { Recipe } from "../../interfaces";
import RecipeCardGrid from "./RecipeCardGrid";
import RecipeAPI from "./RecipeAPI";

interface IProps {

}

const Recipes: React.FC<IProps> = (props: IProps) => {

    const [recipes, setRecipes] = React.useState<Recipe[] | null>(null);

    React.useEffect(() => {
        let isMounted = true;
        RecipeAPI.getRecipes().then((result: Recipe[]) => {
            if (isMounted) {
                setRecipes(result);
            }
        }).catch((er: Error) => {
            console.log(`Error fetching Recipes | ${er}`);
        });
        return () => { isMounted = false; }
    }, []);

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