import {Directive, Input, Output, ElementRef, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Directive({
    selector: '[inputDebounce]'    
})

export class InputDebounceDirective  {
    @Input('inputDebounce') delay: number = 300;
    @Output() value: EventEmitter<any> = new EventEmitter<any>();      
    
    constructor(private el: ElementRef) {
        const eventStream = Observable.fromEvent(el.nativeElement, 'input')
            .map(() => el.nativeElement.value)
            .debounceTime(this.delay)
            .distinctUntilChanged();
            
        eventStream.subscribe(input => this.value.emit(input));
    }
    
}