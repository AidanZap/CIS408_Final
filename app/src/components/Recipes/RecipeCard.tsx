import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";
import { Recipe } from '../../interfaces';

interface IProps {
    recipe: Recipe,
    image: string | null,
    editRecipe: (recipe: Recipe) => void
}

const RecipeCard: React.FC<IProps> = (props: IProps) => {

    const placeholderPath = "/images/placeholder.png"

    return <>
        <Card sx={{width: 345, minWidth: 345 }}>
            <CardMedia
                component="img"
                height="200"
                image={props.image ? props.image : placeholderPath}
                alt={props.image ? props.image : `placeholder for ${props.recipe.name}`} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.recipe.name}
                </Typography>
            <CardActions disableSpacing sx={{justifyContent: "end"}}>
                <Button variant="contained" color="secondary" onClick={() => {props.editRecipe(props.recipe)}}>Edit</Button>
            </CardActions>
            </CardContent>
        </Card>
    </>;
}

export default RecipeCard;