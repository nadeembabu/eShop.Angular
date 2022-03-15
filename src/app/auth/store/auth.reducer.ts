import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State{
    user:User;
    authError:string;
    loading:boolean;
}

const initialState={
    user:null,
    authError:null,
    loading:false
};

export function authReducer(state=initialState,action:AuthActions.AuthActions){
    switch(action.type){
        case AuthActions.AUTHENTICATE_SUCCESS:
            const user=new User((<AuthActions.AuthenticateSuccess>action).payload.email,
                                (<AuthActions.AuthenticateSuccess>action).payload.userId,
                                (<AuthActions.AuthenticateSuccess>action).payload.token,
                                (<AuthActions.AuthenticateSuccess>action).payload.tokenExpirationDate
                                );
            return{
                ...state,
                user:user,
                authError:null,
                loading:false
            };
        case AuthActions.LOGOUT:
            return{
                ...state,
                user:null
            }

        case AuthActions.LOGIN_START:
            return{
            ...state,
            authError:null,
            loading:true
            }
        
        case AuthActions.AUTHENTICATE_FAIL:
            return{
                ...state,
                user:null,
                authError:(<AuthActions.AuthenticateFail>action).payload,
                loading:false
            }
        default:
            return state;
    }
    
}
