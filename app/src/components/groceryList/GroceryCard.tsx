import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography } from "@mui/material";
import Increment from "./Increment";

interface IProps {
    name: string,
    image: string | null,
    amount: number,
    updateFunction: (num: number) => void
}

const GroceryCard: React.FC<IProps> = (props: IProps) => {

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
                <Increment currentValue={props.amount} updateFunction={props.updateFunction} />
            </CardActions>
            </CardContent>
        </Card>

    </>;
}

export default GroceryCard;