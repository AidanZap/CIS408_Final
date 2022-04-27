export interface Ingredient {
    ingredientID: number,
    name: string,
    quantity: number,
    unit: string,
    category: string
}

export interface Recipe {
    recipeID: number,
    name: string
}

export enum RestMethod {
    GET = 0,
    POST = 1,
    PATCH = 2,
    DELETE = 3
}