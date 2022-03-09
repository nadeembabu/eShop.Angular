import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopplinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editItemIndex:number;
  editedItem:Ingredient;
  ingredientToDelete:Ingredient;
  
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription=this.shoppingListService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editItemIndex=index;
        this.editedItem=this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    );
  }  

  onSubmit(form:NgForm){
    const value=form.value;
    const newIngredient=new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editItemIndex,newIngredient); 
    }else{
    this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  
  }

