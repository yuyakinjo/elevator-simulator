import { Component, OnInit } from '@angular/core';
import anime, { AnimeInstance } from 'animejs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  anime!: AnimeInstance;
  ngOnInit(): void {
    const targets = document.querySelector('.room');
    this.anime = anime({ targets, translateY: '-100', autoplay: false });
  }

  start() {
    this.anime.play();
  }

  pause(): void {
    this.anime.pause();
  }

  restart(): void {
    this.anime.restart();
  }

  reverse(): void {
    this.anime.reverse();
  }
}
