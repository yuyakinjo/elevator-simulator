import { AfterContentChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core'; // prettier-ignore
import { FormControl } from '@angular/forms';
import anime, { AnimeInstance, AnimeTimelineInstance, EasingOptions } from 'animejs';
import { last } from 'ramda';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, AfterContentChecked {
  anime!: AnimeTimelineInstance;
  duration = 500;
  height = 0;
  oneFloorHeight = 0;
  disable = false;
  oneFloorHeightPx = '';
  easing: EasingOptions = 'easeInOutSine';

  @ViewChild('room') room!: ElementRef<HTMLDivElement>;
  @ViewChild('route') route!: ElementRef<HTMLDivElement>;

  readonly autoplay = new FormControl(localStorage.getItem('autoplay')?.includes('true') ?? true);

  readonly autoplayChange$ = this.autoplay.valueChanges.pipe(
    tap((autoplay) => localStorage.setItem('autoplay', autoplay)),
    tap(() => this.restart())
  );

  constructor(private view: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.oneFloorHeight = Math.floor(this.height / 10);
    this.oneFloorHeightPx = `${this.oneFloorHeight}px`;
  }

  ngAfterViewInit(): void {
    const roomDivHeight = this.room.nativeElement.clientHeight;
    const routeDivHeight = this.route.nativeElement.clientHeight;
    this.height = routeDivHeight - roomDivHeight;
    const autoplay = this.autoplay.value;
    const targets = document.querySelector('.room');
    const duration = this.duration;
    const easing = this.easing;
    this.anime = anime.timeline({
      targets,
      autoplay,
      duration,
      easing,
    });
    this.view.markForCheck();
  }

  #getLastPosition(): string | undefined {
    const children = anime.get(this.anime, 'children') as unknown as AnimeInstance[];
    const currentValues = children.flatMap(({ animations }) => animations.map(({ currentValue }) => currentValue));
    return last(currentValues);
  }

  async #move(direction: 'up' | 'down' = 'up'): Promise<void> {
    const lastPosition = this.#getLastPosition();
    const position = Number(lastPosition?.replace('-', '').replace('px', '')) || 0;
    if (direction === 'up' && position + this.oneFloorHeight > this.height) return alert("You can't go up");
    if (direction === 'down' && !position) return alert("You can't go down");
    if (direction === 'down' && position > this.height) return alert("You can't go down");
    this.disable = true;
    const to = direction === 'up' ? `-=${this.oneFloorHeight}` : `+=${this.oneFloorHeight}`;
    const translateY = lastPosition ? [`${lastPosition}`, to] : [to];
    this.anime.add({ translateY }, -1); // -1 でないとアニメーションがちらつくため
    await this.anime.finished;
    this.disable = false;
    this.view.markForCheck();
  }

  async up() {
    await this.#move();
  }

  async down() {
    await this.#move('down');
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
