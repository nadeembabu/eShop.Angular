import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
//import { RecipeService } from '../recipe.service';

import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id:number;
  editMode=false;
  recipeForm:UntypedFormGroup;

  private storeSub:Subscription;


  constructor(private route:ActivatedRoute,
              private router:Router,
              private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params:Params)=>{
          this.id=+params['id'];
          this.editMode=params['id'] !=null;
          this.initForm();
        }
      );
  }

  get controls(){
    return (<UntypedFormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit(){
    // const newRecipe=new Recipe(this.recipeForm.value['name'],
    //                            this.recipeForm.value['description'],
    //                            this.recipeForm.value['imagePath'],
    //                            this.recipeForm.value['ingredients']);
    if(this.editMode){
      //this.recipeService.updateRecipe(this.id,this.recipeForm.value);
      this.store.dispatch(new RecipesActions.UpdateRecipe({index:this.id,newRecipe:this.recipeForm.value}));
    }
    else{
      //this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onAddIngredient(){
    (<UntypedFormArray>this.recipeForm.get('ingredients')).push(
      new UntypedFormGroup({
        'name':new UntypedFormControl(null,Validators.required),
        'amount':new UntypedFormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onDeleteIngredient(i:number){
    (<UntypedFormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  ngOnDestroy(): void {
    if(this.storeSub)
    this.storeSub.unsubscribe();
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients=new UntypedFormArray([]);

    if(this.editMode){
      this.storeSub=this.store.select('recipes')
      .pipe(map(recipesState=>{
        return recipesState.recipes.find((recipe,index)=>{
          return index===this.id;
        })
      })
      ).subscribe(recipe=>{
        recipeName=recipe.name;
        recipeImagePath=recipe.imagePath;
        recipeDescription=recipe.description;
        if(recipe['ingredients']){
          for(let ingredient of recipe.ingredients){
            recipeIngredients.push(
              new UntypedFormGroup({
                'name':new UntypedFormControl(ingredient.name,Validators.required),
                'amount':new UntypedFormControl(ingredient.amount,[
                  Validators.pattern(/^[1-9]+[0-9]*$/),
                  Validators.required])
              })
            );
          }
        }
      })
    }
    
    this.recipeForm=new UntypedFormGroup({
      'name':new UntypedFormControl(recipeName,Validators.required),
      'imagePath':new UntypedFormControl(recipeImagePath,Validators.required),
      'description':new UntypedFormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    });

  }

}
