import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoggingService } from './logging.service';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'eShop';

  constructor(private loggingService:LoggingService,
              private store:Store<fromApp.AppState>,
              @Inject(PLATFORM_ID) private platformId){}


  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
    this.store.dispatch(new AuthActions.AutoLogin());
    }
    this.loggingService.printlog('hello from app component ngOnInit');
  }
}
