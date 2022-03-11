import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopplinglist.service';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css'],
  providers:[]
})
export class ShoppinglistComponent implements OnInit,OnDestroy {
  ingredients:Ingredient[];
  private igChangeSub:Subscription;

  constructor(private shoppingListService:ShoppingListService,
              private loggingService:LoggingService) { }

  ngOnInit(): void {
    this.loggingService.printlog('hello from shopping list ngOnInit');
    this.ingredients=this.shoppingListService.getIngredients();
    this.igChangeSub=this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=ingredients;
      }
    )
  }
  ngOnDestroy(): void {
      this.igChangeSub.unsubscribe();
  }
  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }

}
