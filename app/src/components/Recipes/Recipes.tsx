import React from 'react';
import { Stack, Button, Divider } from "@mui/material";
import { Recipe } from "../../interfaces";
import RecipeCardGrid from "./RecipeCardGrid";
import RecipeAPI from "./RecipeAPI";
import NewRecipe from "./NewRecipe";

interface IProps {

}

enum Mode {
    view = 0,
    add = 1,
    edit = 2
}

const Recipes: React.FC<IProps> = (props: IProps) => {

    const [recipes, setRecipes] = React.useState<Recipe[] | null>(null);
    const [recipeToEdit, setRecipeToEdit] = React.useState<Recipe | null>(null);
    const [mode, setMode] = React.useState<Mode>(Mode.view);
    const [needToFetch, setNeedToFetch] = React.useState<boolean>(true)

    React.useEffect(() => {
        let isMounted = true;
        if (needToFetch) {
            RecipeAPI.getAllRecipes().then((result: Recipe[]) => {
                if (isMounted) {
                    setRecipes(result);
                    setNeedToFetch(false);
                }
            }).catch((er: Error) => {
                console.log(`Error fetching Recipes | ${er}`);
            });
        }
        return () => { isMounted = false; }
    }, [needToFetch]);

    const editRecipe = (recipe: Recipe) => {
        setRecipeToEdit(recipe);
        setMode(Mode.edit);
    }

    const returnToRecipes = async () => {
        setMode(Mode.view);
        setNeedToFetch(true);
    }

    if (mode === Mode.view) {
        return <Stack direction="column" divider={<Divider orientation="horizontal" />} spacing={3}>
            <Stack direction="row" spacing={3} sx={{mt: 3}}>
                <Button variant="contained" color="secondary" onClick={() => {setMode(Mode.add)}}>Create Recipe</Button>
            </Stack>
            <RecipeCardGrid recipes={recipes} editRecipe={editRecipe} />
        </Stack>;
    } else if (mode === Mode.add) {
        return <NewRecipe exitScreen={returnToRecipes}/>
    } else {
        return <p>Editing {recipeToEdit?.name}</p>
    }
}

export default Recipes;