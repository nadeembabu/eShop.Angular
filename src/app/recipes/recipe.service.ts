import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shoppinglist/shopplinglist.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    recipesChanged=new Subject<Recipe[]>();

    // private recipes:Recipe[]=[
    //     new Recipe(
    //         'Roasted Chicken breast',
    //         'Delicious',
    //         'https://www.simplyrecipes.com/thmb/J16z9nqrecfSLo0ZoymicyidIvU=/736x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Quesadilla-LEAD-5-55da42a2a306497c85b1328385e44d85.jpg',
    //         [
    //             new Ingredient('Chicken breast',2),
    //             new Ingredient('Olive oil',2)
    //         ]),
    //     new Recipe(
    //         'Chilli Chicken',
    //         'Spicy',
    //         'https://www.simplyrecipes.com/thmb/J16z9nqrecfSLo0ZoymicyidIvU=/736x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Quesadilla-LEAD-5-55da42a2a306497c85b1328385e44d85.jpg',
    //         [
    //             new Ingredient('Chicken',100),
    //             new Ingredient('Chillies',100)
    //         ])
    //   ];
    private recipes:Recipe[]=[];
    constructor(private slService:ShoppingListService){}

    setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }
    getRecipe(id:number){
        return this.recipes[id];
    }



    addIngredientstoShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }

}