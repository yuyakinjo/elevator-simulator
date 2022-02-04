import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core'; // prettier-ignore
import { FormControl } from '@angular/forms';
import anime, { AnimeInstance } from 'animejs';
import { negate } from 'ramda';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  anime!: AnimeInstance;

  @ViewChild('room') room!: ElementRef<HTMLDivElement>;
  @ViewChild('route') route!: ElementRef<HTMLDivElement>;

  readonly autoplay = new FormControl(
    localStorage.getItem('autoplay')?.includes('true') ?? true
  );

  readonly autoplayChange$ = this.autoplay.valueChanges.pipe(
    tap((autoplay) => localStorage.setItem('autoplay', autoplay)),
    tap(() => this.restart())
  );

  ngAfterViewInit(): void {
    const roomDivHeight = this.room.nativeElement.clientHeight;
    const routeDivHeight = this.route.nativeElement.clientHeight;
    const height = routeDivHeight - roomDivHeight;
    const targets = document.querySelector('.room');
    const autoplay = this.autoplay.value;
    const duration = 3000;
    this.anime = anime({
      targets,
      autoplay,
      duration,
      translateY: negate(height),
      easing: 'easeInOutExpo',
    });
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
