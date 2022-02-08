import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core'; // prettier-ignore
import { FormControl } from '@angular/forms';
import anime, { AnimeInstance, AnimeTimelineInstance } from 'animejs';
import { last } from 'ramda';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  anime!: AnimeTimelineInstance;
  duration = 500;
  height = 0;
  oneFloorHeight = 0;

  @ViewChild('room') room!: ElementRef<HTMLDivElement>;
  @ViewChild('route') route!: ElementRef<HTMLDivElement>;

  readonly autoplay = new FormControl(localStorage.getItem('autoplay')?.includes('true') ?? true);

  readonly autoplayChange$ = this.autoplay.valueChanges.pipe(
    tap((autoplay) => localStorage.setItem('autoplay', autoplay)),
    tap(() => this.restart())
  );

  ngAfterViewInit(): void {
    const roomDivHeight = this.room.nativeElement.clientHeight;
    const routeDivHeight = this.route.nativeElement.clientHeight;
    this.height = routeDivHeight - roomDivHeight;
    this.oneFloorHeight = this.height / 10;
    const autoplay = this.autoplay.value;
    const targets = document.querySelector('.room');
    const duration = this.duration;
    const easing = 'easeInOutExpo';
    this.anime = anime.timeline({
      targets,
      autoplay,
      duration,
      easing,
    });
  }

  up() {
    const children = anime.get(this.anime, 'children') as unknown as AnimeInstance[];
    const currentValues = children.flatMap(({ animations }) => animations.map(({ currentValue }) => currentValue));
    const lastValue = last(currentValues);
    const to = `-=${this.oneFloorHeight}`;
    const translateY = currentValues.length ? [`${lastValue}`, to] : [to];
    this.anime.add({ translateY }, -1); // -1 でないとアニメーションがちらつくため
  }

  down() {
    const children = anime.get(this.anime, 'children') as unknown as AnimeInstance[];
    const currentValues = children.flatMap(({ animations }) => animations.map(({ currentValue }) => currentValue));
    const lastValue = last(currentValues);
    const to = `+=${this.oneFloorHeight}`;
    const translateY = currentValues.length ? [`${lastValue}`, to] : [to];
    this.anime.add({ translateY }, -1); // -1 でないとアニメーションがちらつくため
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
