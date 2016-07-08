import {Component, Inject, provide, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'dbs-app',
    styles: [
        require('./app.component.scss')
    ],
    encapsulation: ViewEncapsulation.None,
    template: require('./app.component.html'),    
    directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {    
    constructor() {
    }
}