import React from 'react';
import { Stack, Typography, Divider, Button, Dialog, DialogContent, DialogTitle, DialogActions, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Increment from "./Increment";
import PrintIcon from '@mui/icons-material/Print';
import { Recipe, RecipeIngredient } from "../../interfaces";
import RecipeAPI from "../Recipes/RecipeAPI";
import GroceryCardGrid from "./GroceryCardGrid";

interface IProps {

}

const GroceryList: React.FC<IProps> = (props: IProps) => {

    const [numberOfMeals, setNumberOfMeals] = React.useState<number>(5);
    const [recipes, setRecipes] = React.useState<Recipe[] | null>(null);
    const [selectedRecipes, setSelectedRecipes] = React.useState<Record<string, number>>({});
    const [groceryList, setGroceryList] = React.useState<RecipeIngredient[] | null>(null);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

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

    const updateFunction = (num: number) => {
        setNumberOfMeals((prevState) => {
            let result = prevState + num;
            if (result < 1) return 1;
            return result;
        });
    }

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

    const handleCreateGroceryList = () => {
        if (!selectedRecipes || Object.keys(selectedRecipes).length < 1) {
            console.log("No recipes selected!");
        } else {
            let totalSelected = Object.values(selectedRecipes).reduce((prev, current) => prev + current);
            if (totalSelected < numberOfMeals) {
                console.log(`Need to select ${numberOfMeals - totalSelected} more recipes`);
            } else if (totalSelected > numberOfMeals) {
                console.log("Selected too many recipes!");
            } else {
                RecipeAPI.getGroceryList(selectedRecipes).then((result) => {
                    if (result) {
                        setGroceryList(result);
                        setIsOpen(true);
                    } else {
                        console.log("Error creating groceryList");
                    }
                })
                .catch((err) => {
                    console.log("Error creating groceryList");
                });
            }
        }
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return <>
        <Dialog open={isOpen} scroll="paper">
            <DialogTitle>This Week</DialogTitle>
            <DialogContent dividers>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groceryList ? groceryList!.map((ingredient, index) =>
                            <TableRow key={index}>
                                <TableCell>{ingredient.name}</TableCell>
                                <TableCell>{ingredient.quantity}</TableCell>
                                <TableCell>{ingredient.unit}</TableCell>
                                <TableCell>{ingredient.category}</TableCell>
                            </TableRow>
                        ) : <></>}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="primary">Close</Button>
                <Button variant="contained" color="secondary">
                    Print <PrintIcon />
                </Button>
            </DialogActions>
        </Dialog>
        <Stack direction="column" divider={<Divider orientation="horizontal" />} spacing={3}>
            <Stack direction="row" spacing={3} sx={{mt: 3}}>
                <Typography variant="h4">Number of Meals:</Typography>
                <Increment currentValue={numberOfMeals} updateFunction={updateFunction} />
                <Button onClick={handleCreateGroceryList} variant="contained" color="secondary">Create groceryList</Button>
            </Stack>
            <GroceryCardGrid recipes={recipes} selectedRecipes={selectedRecipes} changeQuantity={changeRecipeQuantity} />
        </Stack>
    </>
}

export default GroceryList;