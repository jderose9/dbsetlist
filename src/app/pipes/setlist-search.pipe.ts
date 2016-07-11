import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'setlistSearch'
})

export class SetlistSearchPipe implements PipeTransform {
    transform(value: any[], query: string) : any {
        if(value){
            
            let results = value;

            let querySplit = query.split(' ');
            for(let i = 0; i < querySplit.length; i++) {
                let currentVal = querySplit[i].toLowerCase();
                if(currentVal.startsWith('year:')) {
                    let year = Number.parseInt(querySplit[i].toLowerCase().replace('year:', ''));
                    if(!isNaN(year)) {
                        querySplit.splice(i, 1);
                        i--;
                        results = results.filter(item => item.DateMoment.year() == year);
                    }
                }
                else if(currentVal.startsWith('month:')) {
                    let month = Number.parseInt(querySplit[i].toLowerCase().replace('month:', ''));
                    if(!isNaN(month)) {
                        querySplit.splice(i, 1);
                        i--;
                        results = results.filter(item => (item.DateMoment.month()+1) == month);
                    }
                }
            }

            let reg = new RegExp(querySplit.join(' '), 'i');

            return results.filter((item) => {
                return (reg.test(item.DateDisplay)
                    || reg.test(item.Comments)  
                    || reg.test(item.Venue.Name)
                    || reg.test(item.Venue.City)
                    || reg.test(item.Venue.State)
                    || (item.Sets && item.Sets.some(t => t.SetSongs && t.SetSongs.some(ss => reg.test(ss.Song.Name)))) 
                    || (item.Annotations && item.AnnotationArray.some(a => reg.test(a.Text))))
            });
        }
    }
}