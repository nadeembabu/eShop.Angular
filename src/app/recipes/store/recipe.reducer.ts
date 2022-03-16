import { Recipe } from "../recipe.model";

import * as RecipesActions from './recipe.actions';


export interface State{
    recipes:Recipe[];
}

const initialState:State={
    recipes:[]
};

export function RecipeReducer(state=initialState,action:RecipesActions.RecipesActions){
    switch(action.type){
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes:[...(<RecipesActions.SetRecipes>action).payload]
            };
        
        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes:[...state.recipes,(<RecipesActions.AddRecipe>action).payload]
            }
        case RecipesActions.UPDATE_RECIPE:
            const act=<RecipesActions.UpdateRecipe>action;
            const UpdatedRecipe={
                ...state.recipes[act.payload.index],
                ...act.payload.newRecipe
            };
            const UpdatedRecipes=[...state.recipes];
            UpdatedRecipes[act.payload.index]=UpdatedRecipe;
            return{
                ...state,
                recipes:UpdatedRecipes
            }
        case RecipesActions.DELETE_RECIPE:
            return{
                ...state,
                recipes:state.recipes.filter((recipe,index)=>{
                    return index!==(<RecipesActions.DeleteRecipe>action).payload;
                })
            }
        default:
            return state;
    }
    return state
}