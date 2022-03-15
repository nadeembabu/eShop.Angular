import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State{
    user:User
}

const initialState={
    user:null
};

export function authReducer(state=initialState,action:AuthActions.AuthActions){
    switch(action.type){
        case AuthActions.LOGIN:
            const user=new User((<AuthActions.Login>action).payload.email,
                                (<AuthActions.Login>action).payload.userId,
                                (<AuthActions.Login>action).payload.token,
                                (<AuthActions.Login>action).payload.tokenExpirationDate
                                );
            return{
                ...state,
                user:user
            };
        case AuthActions.LOGOUT:
            return{
                ...state,
                user:null
            }
        default:
            return state;
    }
    
}
