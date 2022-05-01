import React from 'react';
import { Grid, Button, TextField, Autocomplete, Typography } from "@mui/material";
import { Ingredient, RecipeIngredient, Recipe } from "../../interfaces";
import IngredientAPI from "../Ingredients/IngredientAPI";
import RecipeAPI from "./RecipeAPI";
import SelectIngredientList from './SelectIngredientList';

interface IProps {
    exitScreen: () => void;
}

const NewRecipe: React.FC<IProps> = (props: IProps) => {

    const [ingredients, setIngredients] = React.useState<Ingredient[] | null>(null);
    const [currentIngredient, setCurrentIngredient] = React.useState<Ingredient | null>(null);
    const [recipeName, setRecipeName] = React.useState<string>("");
    const [selectedIngredients, setSelectedIngredients] = React.useState<RecipeIngredient[]>([]);
    const [recipeToPost, setRecipeToPost] = React.useState<boolean>(false);

    React.useEffect(() => {
        let isMounted = true;
        IngredientAPI.getAllIngredients().then((result: Ingredient[]) => {
            if (isMounted) {
                setIngredients(result);
            }
        }).catch((er: Error) => {
            console.log(`Error fetching Ingredients | ${er}`);
        });
        return () => { isMounted = false;}
    }, []);

    React.useEffect(() => {
        if (recipeToPost) {
            let isMounted = true;
            RecipeAPI.insertRecipe(recipeName, selectedIngredients).then((result: Recipe[]) => {
                if (isMounted) {
                    console.log(`POSTED RECIPE | TOTAL: ${result.length}`);
                    props.exitScreen();
                }
            }).catch((er: Error) => {
                console.log(`Error posting Recipe | ${er}`);
            });
            return () => { isMounted = false; }
        }
    }, [recipeToPost]);

    const changeIngredientQuantity = (ingredient: RecipeIngredient, amount: number) => {
        let ingredientID = ingredient.ingredientID
        if (selectedIngredients && selectedIngredients.find(i => i.ingredientID === ingredientID) !== undefined) {
            if (ingredient.quantity + amount < 1) {
                setSelectedIngredients((prevState) => prevState.filter(i => i.ingredientID !== ingredientID));
            } else {
                setSelectedIngredients((prevState) => prevState.map(i => { if (i.ingredientID === ingredientID) i.quantity += amount; return i;}));
            }
        } else {
            if (amount < 1) return;
            setSelectedIngredients((prevState) => [...prevState, ingredient]);
        }
    }

    const handleAddIngredient = () => {
        if (!currentIngredient) {
            console.log("No ingredient selected!");
        } else {
            changeIngredientQuantity({...currentIngredient, quantity: 1}!, 1)
        }
    }

    const handleSubmitRecipe = () => {
        if (!recipeName || recipeName.trim() === "") {
            console.log("Recipe name cannot be blank!");
        } else if (!selectedIngredients || selectedIngredients.length < 1) {
            console.log("Cannot enter recipe without ingredients!");
        } else {
            setRecipeToPost(true);
        }
    }

    return <>
        <Grid container sx={{mt:1, mb:3}} spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">New Recipe</Typography>
            </Grid>
            <Grid item xs={12} sx={{mb: 3}}>
                <TextField value={recipeName} onChange={(e) => setRecipeName(e.target.value)} variant="outlined" label="Recipe Name" fullWidth ></TextField>
            </Grid>
            <Grid item xs={4}>
                <Autocomplete
                    disablePortal
                    disabled={ingredients === null}
                    value={currentIngredient}
                    onChange={(event, newValue) => {setCurrentIngredient(newValue)}}
                    id="select-ingredient"
                    options={ingredients!}
                    groupBy={(option) => option.category}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Ingredient" />}
                />
            </Grid>
            <Grid item xs>
                <Button onClick={handleAddIngredient} variant="contained" color="secondary" sx={{height: 45}}>Add</Button>
            </Grid>
            <Grid item xs={6}>
                <SelectIngredientList selectedIngredients={selectedIngredients} changeIngredientQuantity={changeIngredientQuantity} />
            </Grid>
            <Grid item xs={12}>
                <Button onClick={handleSubmitRecipe} variant="contained" color="secondary" fullWidth sx={{height: 55}}>Save Recipe</Button>
            </Grid>
        </Grid>
    </>;
}

export default NewRecipe;