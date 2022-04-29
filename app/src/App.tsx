import React from 'react';
import { Container, Typography } from "@mui/material";
import NavBar from "./components/NavBar/NavBar";
import GroceryList from "./components/groceryList/GroceryList";
import Ingredients from "./components/Ingredients/Ingredients";
import Recipes from "./components/Recipes/Recipes";

const App: React.FC = () => {

    const [currentPage, setCurrentPage] = React.useState<string>("groceryList");

    const renderPage = () => {
        switch(currentPage) {
            case "groceryList": return <GroceryList />
            case "Recipes": return <Recipes />
            case "Ingredients": return <Ingredients />
            default: return <p>Application Error!</p>
        }
    }

    return <>
        <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <Container>
            {renderPage()}
        </Container>
        <Typography sx={{position: "fixed", bottom: 0, textAlign: "center", mx: "auto", width: "100%"}}>
            {"2022 ©️ | Made with ❤️ Aidan, Kirk, and Mo"}
        </Typography>
    </>;
}

export default App;
