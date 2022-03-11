import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoggingService } from "../logging.service";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinner } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinner,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports:[
        CommonModule,
    ],
    exports:[
        AlertComponent,
        LoadingSpinner,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ],
    providers:[]
})
export class SharedModule{

}