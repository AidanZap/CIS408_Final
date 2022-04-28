import React from 'react';
import { AppBar, Toolbar, Button, Icon, Typography } from "@mui/material";
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';

interface IProps {
    currentPage: string,
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

const NavBar: React.FC<IProps> = (props: IProps) => {

    return <>
        <AppBar position="static" color="primary">
            <Toolbar>
                <Icon color="inherit" sx={{mr: 1}}>
                    <LocalGroceryStoreOutlinedIcon />
                </Icon>
                {["groceryList", "Recipes", "Ingredients"].map((pageName, index) => {
                    return <Button key={index} onClick={() => {props.setCurrentPage(pageName)}}>
                        <Typography sx={props.currentPage === pageName? {textDecoration: "underline", mx:1} : {mx:1} } fontSize={18} color="white">
                            {pageName}
                        </Typography>
                    </Button>
                })}
            </Toolbar>
        </AppBar>
    </>;
}

export default NavBar;