import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shoppinglist.actions";

export interface State{
    ingredients:Ingredient[],
    editedIngredient:Ingredient,
    editedIngredientIndex:number
}

const initialState:State={
    ingredients:[
        new Ingredient('apples',5),new Ingredient('tomatoes',10)
      ],
      editedIngredient:null,
      editedIngredientIndex:-1
};

export function shoppingListReducer(state:State=initialState,
                                    action:ShoppingListActions.ShoppingListActions){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            const newIngredient=(<ShoppingListActions.AddIngredient>action).payload;
            return {
                ...state,
                ingredients:[...state.ingredients,newIngredient]
            };
        
        case ShoppingListActions.ADD_INGREDIENTS:
            const addedIngredients=(<ShoppingListActions.AddIngredients>action).payload;
            return {
                ...state,
                ingredients:[...state.ingredients, ...addedIngredients]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const id=state.editedIngredientIndex;
            const newUpdatedIngredient=(<ShoppingListActions.UpdateIngredient>action).payload;
            const ingredient=state.ingredients[id];
            const updatedIngredient={
                ...ingredient,
                ...newUpdatedIngredient
            };
            const updatedIngredients=[...state.ingredients];
            updatedIngredients[id]=updatedIngredient;
            return {
                ...state,
                ingredients:updatedIngredients,
                editedIngredientIndex:-1,
                editedIngredient:null
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            return{
                ...state,
                ingredients:state.ingredients.filter((ig,igIndex)=>{
                    return igIndex!==state.editedIngredientIndex;
                })
            }
        case ShoppingListActions.START_EDIT:
            const index=(<ShoppingListActions.StartEdit>action).payload;
            return{
                ...state,
                editedIngredientIndex:index,
                editedIngredient:state.ingredients[index]
            }
        case ShoppingListActions.STOP_EDIT:
            return{
                ...state,
                editedIngredient:null,
                editedIngredientIndex:-1
            }
        default:
            return state;
    }
}