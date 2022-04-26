import React from 'react';
import { Container } from "@mui/material";
import IngredientList from "./components/IngredientList/IngredientList"

const App: React.FC = () => {

    // Add more components to this return to see them!

    return <>
        <Container>
            <IngredientList recipeID={"1"} />
        </Container>
    </>;
}

export default App;
