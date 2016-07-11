import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'moment'
})

export class MomentPipe implements PipeTransform {
    transform(value: number, formatString?: string) : any {
        if(!formatString)
            formatString = 'M/D/YYYY'                        
        return moment(value).format(formatString);
    }
}