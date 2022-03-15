import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shoppinglist.actions';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css'],
  providers:[]
})
export class ShoppinglistComponent implements OnInit,OnDestroy {
  ingredients:Observable<{ingredients:Ingredient[]}>;
  private igChangeSub:Subscription;

  constructor(private loggingService:LoggingService,
              private store:Store<fromApp.AppState>
              ) { }

  ngOnInit(): void {
    this.ingredients=this.store.select('shoppingList');
  
  }
  ngOnDestroy(): void {
      //this.igChangeSub.unsubscribe();
  }
  onEditItem(index:number){
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
