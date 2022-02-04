import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import anime, { AnimeInstance } from 'animejs';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  anime!: AnimeInstance;

  @ViewChild('room') room!: ElementRef<HTMLDivElement>;
  @ViewChild('route') route!: ElementRef<HTMLDivElement>;

  readonly autoplay = new FormControl(
    localStorage.getItem('autoplay')?.includes('true') ?? true
  );

  readonly autoplayChange$ = this.autoplay.valueChanges.pipe(
    tap((autoplay) => localStorage.setItem('autoplay', autoplay))
  );

  ngAfterViewInit(): void {
    const roomDivHeight = this.room.nativeElement.clientHeight;
    const routeDivHeight = this.route.nativeElement.clientHeight;
    const targets = document.querySelector('.room');
    const autoplay = this.autoplay.value;
    const height = routeDivHeight - roomDivHeight;
  }

  play() {
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
    this.play();
  }
}
