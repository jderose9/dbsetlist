import {provide, enableProdMode, ExceptionHandler} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';

import {AppComponent} from './app/app.component';
import {APP_ROUTER_PROVIDERS} from './app/app.routes';

bootstrap(AppComponent, [        
    provide(HTTP_PROVIDERS, APP_ROUTER_PROVIDERS)
]);