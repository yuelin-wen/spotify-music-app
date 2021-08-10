/*********************************************************************************
*  WEB422 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: _______Yuelin Wen_______________ Student ID: ____114379209__________ Date: _______Aug 10 2021__________
*
*  Online Link to Music App: _________https://spotify-music-app-mu.vercel.app/newReleases
*
*  Online Link to User Api: __________https://fast-gorge-00438.herokuapp.com
*
********************************************************************************/ 


import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'web422-a4';
  searchString: String;
  token: User;

  sub: Subscription;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.searchString = '';
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
      }
    });
  }

  handleSearch() {
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
    this.searchString = "";
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
