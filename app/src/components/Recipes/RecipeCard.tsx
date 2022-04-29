import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";

interface IProps {
    recipeID: number,
    name: string,
    image: string | null,
    editRecipe: (recipeID: number) => void
}

const RecipeCard: React.FC<IProps> = (props: IProps) => {

    const placeholderPath = "/images/placeholder.png"

    return <>
        <Card sx={{width: 345, minWidth: 345 }}>
            <CardMedia
                component="img"
                height="200"
                image={props.image ? props.image : placeholderPath}
                alt={props.image ? props.name : `placeholder for ${props.name}`} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
            <CardActions disableSpacing sx={{justifyContent: "end"}}>
                <Button variant="contained" color="secondary" onClick={() => {props.editRecipe(props.recipeID)}}>Edit</Button>
            </CardActions>
            </CardContent>
        </Card>
    </>;
}

export default RecipeCard;