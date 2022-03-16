import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
 private userSub:Subscription;
 isAuthenticated=false;

  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub=this.store.select('auth').pipe(
      map(authState=>{
        return authState.user;
      })
      ).subscribe(user=>{
     this.isAuthenticated=!!user;
     console.log(!user);
     console.log(!!user);
    });
  }

  onSaveData(){
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFecthData(){
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }  

  onLogout(){
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
