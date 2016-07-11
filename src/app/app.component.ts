import {Component, Inject, provide, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {InputDebounceDirective} from './directives/input-debounce.directive'
import {SetlistSearchPipe} from './pipes/setlist-search.pipe'
import * as moment from 'moment';


@Component({
    selector: 'dbs-app',
    styles: [
        require('./app.component.scss')
    ],
    encapsulation: ViewEncapsulation.None,
    template: require('./app.component.html'),    
    directives: [ROUTER_DIRECTIVES, InputDebounceDirective],
    pipes: [SetlistSearchPipe]
})

export class AppComponent {  
    searchValue: string;
      
    setlists: any[];
    songs: any;
    venues: any;

    constructor() {
        this.searchValue = '';        
    }

    ngOnInit() {
        this.setlists = require('../../assets/data/setlists.json');
        this.songs = require('../../assets/data/songs.json');
        this.venues = require('../../assets/data/venues.json');
        this.setlists.forEach(s => { 
            s.Venue = this.venues[s.VenueId];
            s.DateMoment = moment(s.Date);
            s.DateDisplay = s.DateMoment.format('M/D/YYYY');
            if(s.Sets)
                s.Sets.forEach(t => {
                    if(t.SetSongs)
                        (<any[]>t.SetSongs).forEach(g => {
                            g.Song = this.songs[g.SongId];
                        });
            });
            if(s.Annotations)
                s.AnnotationArray = Object.keys(s.Annotations).map(i => s.Annotations[i]);
        });
    }

    search(searchVal) {
        this.searchValue = searchVal;
    }

    searchMonth(month) {
        this._changeSearchAttr("month", month);
    }

    searchYear(year) {
        this._changeSearchAttr("year", year);
    }

    private _changeSearchAttr(attrName, newValue) {
        let newSearchVal = this.searchValue.split(" ").filter(se => !se.toLowerCase().startsWith(attrName)).join(' ');

        if(newValue) {
            if(newSearchVal.length)
                newSearchVal += ' ';

            newSearchVal = newSearchVal + attrName + ":" + newValue;
        }
        
        this.searchValue = newSearchVal;
    }
}