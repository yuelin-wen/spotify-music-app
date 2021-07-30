import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../musica-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: Array<any>;
  sub: Subscription;
  constructor(private mds: MusicDataService) { }

  ngOnInit(): void {
    this.sub = this.mds.getFavourites()
      .subscribe(data => {
        this.favourites = data.tracks;
      })
  }

  removeFromFavourites(id: any) {
    this.mds.removeFromFavourites(id)
    .subscribe(data=>{
      this.favourites=data.tracks;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
