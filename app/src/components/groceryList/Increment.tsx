import React from 'react';
import { Fab, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface IProps {
    currentValue: number
    updateFunction: (num: number) => void;
}

const Increment: React.FC<IProps> = (props: IProps) => {

    return <Stack direction="row" justifyContent="space-between" sx={{border: "1px solid", width: "118px", maxHeight: "40px", borderRadius: "25px"}}>
        <Fab size="small" color="secondary" aria-label="decrease" onClick={() => {props.updateFunction(-1)}}>
            <RemoveIcon />
        </Fab>
        <Typography fontWeight="bold" sx={{marginY: "auto", marginX: "16px"}}>{props.currentValue}</Typography>
        <Fab size="small" color="secondary" aria-label="increase" onClick={() => {props.updateFunction(1)}}>
            <AddIcon />
        </Fab>
    </Stack>;
}

export default Increment;