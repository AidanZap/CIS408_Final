import React from 'react';
import { Recipe } from "../../interfaces";
import RecipeCard from "./RecipeCard";
import { Grid } from "@mui/material";

interface IProps {
    recipes: Recipe[] | null,
    editRecipe: (recipe: Recipe) => void;
}

const RecipeCardGrid: React.FC<IProps> = (props: IProps) => {

    if (!props.recipes) {
        return <p>No Recipes found :(</p>
    } else {
        return <Grid container direction="row" spacing={2} justifyContent="flex-start" alignItems="flex-start">
            {props.recipes!.map((recipe: Recipe, index: number) => {
                return <Grid item xs={12} md={6} lg={4} key={index}>
                    <RecipeCard recipe={recipe} image={null} editRecipe={props.editRecipe} />
                </Grid>
            })}
        </Grid>;
    }
}

export default RecipeCardGrid;