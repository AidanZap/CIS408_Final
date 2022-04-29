import React from 'react';
import { Recipe } from "../../interfaces";
import GroceryCard from "./GroceryCard";
import { Grid } from "@mui/material";

interface IProps {
    recipes: Recipe[] | null,
    selectedRecipes: Record<number, number>,
    changeQuantity: (recipeID:number, amount:number) => void
}

const GroceryCardGrid: React.FC<IProps> = (props: IProps) => {

    const quantity = (recipeID: number): number => {
        if (!(recipeID in props.selectedRecipes)) return 0;
        return props.selectedRecipes[recipeID];
    }

    if (!props.recipes) {
        return <p>No Recipes found :(</p>
    } else {
        return <Grid container direction="row" spacing={2} justifyContent="flex-start" alignItems="flex-start">
            {props.recipes!.map((recipe: Recipe, index: number) => {
                return <Grid item xs={12} md={6} lg={4} key={index}>
                    <GroceryCard name={recipe.name} image={null} amount={quantity(recipe.recipeID)} updateFunction={(number) => {props.changeQuantity(recipe.recipeID, number)}} />
                </Grid>
            })}
        </Grid>;
    }

    
}

export default GroceryCardGrid;