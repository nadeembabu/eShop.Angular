import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule} from '@ngrx/router-store'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from 'src/environments/environment';
import { RecipeEffects } from './recipes/store/recipe.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReduer),
    EffectsModule.forRoot([AuthEffects,RecipeEffects]),
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    StoreRouterConnectingModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [LoggingService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
