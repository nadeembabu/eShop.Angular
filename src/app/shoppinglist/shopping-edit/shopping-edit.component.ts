import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shoppinglist.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editedItem:Ingredient;
  ingredientToDelete:Ingredient;
  
  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription=this.store.select('shoppingList').subscribe(stateData=>{
      if(stateData.editedIngredientIndex>-1){
        this.editMode=true;
        this.editedItem=stateData.editedIngredient;
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }else{
        this.editMode=false;
      }
    });
  }  

  onSubmit(form:NgForm){
    const value=form.value;
    const newIngredient=new Ingredient(value.name,value.amount);
    if(this.editMode){
      //this.shoppingListService.updateIngredient(this.editItemIndex,newIngredient); 
      this.store.dispatch(new ShoppingListActions.
                          UpdateIngredient(newIngredient));
    }else{
    //this.shoppingListService.addIngredient(newIngredient);
    this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode=false;
    form.reset();
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  
  }

