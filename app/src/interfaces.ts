export interface Ingredient {
    ingredientID: string,
    name: string,
    quantity: number,
    unit: string,
    category: string
}

export enum RestMethod {
    GET = 0,
    POST = 1,
    PATCH = 2,
    DELETE = 3
}