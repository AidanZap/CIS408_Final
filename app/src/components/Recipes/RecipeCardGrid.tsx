import React from 'react';
import { Recipe } from "../../interfaces";
import RecipeCard from "./RecipeCard";
import { Grid } from "@mui/material";

interface IProps {
    recipes: Recipe[],
    editRecipe: (recipeID: number) => void;
}

const RecipeCardGrid: React.FC<IProps> = (props: IProps) => {

    return <Grid container direction="row" spacing={2} justifyContent="flex-start" alignItems="flex-start">
        {props.recipes.map((recipe: Recipe, index: number) => {
            return <Grid item xs={12} md={6} lg={4} key={index}>
                <RecipeCard recipeID={recipe.recipeID} name={recipe.name} image={null} editRecipe={props.editRecipe} />
            </Grid>
        })}
    </Grid>;
}

export default RecipeCardGrid;