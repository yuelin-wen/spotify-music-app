import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../musica-data.service';
//import * as data from '../data/SearchResultsAlbum.json';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {
  album: any;

  id: number;
  sub: Subscription;
  constructor(private msb: MatSnackBar, private route: ActivatedRoute, private mds: MusicDataService) { }

  ngOnInit(): void {
    //this.album = (data as any).default;
    // this.sub = this.route.params.subscribe(params => {
    //   this.id = +params['id'];
    // });
    this.id = this.route.snapshot.params['id'];
    this.sub = this.mds.getAlbumById(this.id).subscribe(data => this.album = data);
  }

  addToFavourites(trackID: number) {
    if (this.mds.addToFavourites(trackID)) {
      this.msb.open("Adding to Favourites...", "Done", { duration: 1500 });
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
