import * as fromShoppingList from '../shoppinglist/store/shoppinglist.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
    shoppingList:fromShoppingList.State;
    auth:fromAuth.State;
}

export const appReduer:ActionReducerMap<AppState>={
    shoppingList:fromShoppingList.shoppingListReducer,
    auth:fromAuth.authReducer
};