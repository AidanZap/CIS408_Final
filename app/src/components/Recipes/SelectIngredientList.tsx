import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Grid, Divider, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import Increment from '../groceryList/Increment';
import { RecipeIngredient } from "../../interfaces";

interface IProps {
    selectedIngredients: RecipeIngredient[],
    changeIngredientQuantity: (ingredient: RecipeIngredient, amount: number) => void
}

const SelectIngredientList: React.FC<IProps> = (props: IProps) => {

    if (props.selectedIngredients.length < 1) {
        return <Stack direction="row" alignItems="center" spacing={2}>
            { true ? <ArrowCircleLeftOutlinedIcon /> : <ArrowCircleUpOutlinedIcon />}
            <Typography variant="h5"> Select Ingredients to add to Recipe</Typography>
        </Stack>
    } else {
        return <>
            <Typography variant="h4" sx={{textDecoration: "underline"}}>Ingredients</Typography>
            <List>
                {props.selectedIngredients.map((ingredient: RecipeIngredient, index: number) => {
                    return <React.Fragment key={index}>
                        <ListItem>
                            <ListItemText primary={
                                <Grid container alignItems="center">
                                    <Grid item xs={6}>
                                        <Typography variant="h5">{ingredient.name}</Typography>
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Increment currentValue={ingredient.quantity} updateFunction={(amount: number) => {props.changeIngredientQuantity(ingredient, amount)}} />
                                    </Grid>
                                    <Grid item xs={2} textAlign="center">
                                        <Typography variant="h5">{ingredient.unit === "none" ? "" : ingredient.unit}</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <IconButton size="large" aria-label="delete" onClick={() => {props.changeIngredientQuantity(ingredient, -999)}}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            } />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                })}
            </List>
        </>;
    }
}

export default SelectIngredientList;