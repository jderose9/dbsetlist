import {Component, Inject, provide, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MomentPipe} from './pipes/moment.pipe';


@Component({
    selector: 'dbs-app',
    styles: [
        require('./app.component.scss')
    ],
    encapsulation: ViewEncapsulation.None,
    template: require('./app.component.html'),    
    directives: [ROUTER_DIRECTIVES],
    pipes: [MomentPipe]
})

export class AppComponent {    
    setlists: any[];
    songs: any;
    venues: any;

    constructor() {
    }

    ngOnInit() {
        this.setlists = require('../../assets/data/setlists.json');
        this.songs = require('../../assets/data/songs.json');
        this.venues = require('../../assets/data/venues.json');
        this.setlists.forEach(s => { 
            s.Venue = this.venues[s.VenueId];
            if(s.Sets)
                s.Sets.forEach(t => {
                    if(t.SetSongs)
                        (<any[]>t.SetSongs).forEach(g => {
                            g.Song = this.songs[g.SongId];
                        });
            });
            if(s.Annotations)
                s.AnnotationArray = Object.keys(s.Annotations).map(i => s.Annotations[i])
        });
    }
}