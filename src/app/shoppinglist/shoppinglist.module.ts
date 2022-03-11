import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoggingService } from "../logging.service";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppinglistComponent } from "./shoppinglist.component";

@NgModule({
    declarations:[
        ShoppinglistComponent,
        ShoppingEditComponent
    ],
    imports:[
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild([
            {path:'',component:ShoppinglistComponent},
        ]),
        SharedModule
    ],
    // providers:[LoggingService]
    })
export class ShoppingListModule{

}