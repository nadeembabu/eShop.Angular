import * as fromShoppingList from '../shoppinglist/store/shoppinglist.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipe.reducer';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState{
    recipes:fromRecipes.State;
    shoppingList:fromShoppingList.State;
    auth:fromAuth.State;
}

export const appReduer:ActionReducerMap<AppState>={
    recipes:fromRecipes.RecipeReducer,
    shoppingList:fromShoppingList.shoppingListReducer,
    auth:fromAuth.authReducer
};