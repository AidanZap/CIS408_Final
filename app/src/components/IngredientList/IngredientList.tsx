import React from "react";
import { RecipeIngredient } from "../../interfaces";
import IngredientListAPI from "./IngredientListAPI";

interface IProps {
    recipeID: string
}

const IngredientList: React.FC<IProps> = (props: IProps) => {

    let [ingredientList, setIngredientList] = React.useState<RecipeIngredient[] | null>(null);

    React.useEffect(() => {
        let isMounted = true;
        IngredientListAPI.getIngredientList(props.recipeID).then(result => {
            if (isMounted) {
                setIngredientList(result);
            }
        })
        return () => { isMounted = false; }
    }, [props.recipeID]);

    return <>
        <p>{JSON.stringify(ingredientList)}</p>
    </>;
}

export default IngredientList;