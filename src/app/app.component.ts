import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core'; // prettier-ignore
import { FormControl } from '@angular/forms';
import anime from 'animejs';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  anime!: any;
  duration = 500;
  height = 0;
  oneFloorHeight = 0;

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
    const currentValue = this.anime.children.map((child: any) =>
      child.animations.map((animation: any) => animation.currentValue)
    );
    console.log('🚀 ~ up ~ this.anime', anime.get(this.anime, 'children'));

    console.log('🚀 ~ up ~ currentValue', currentValue);
    const last = -1;
    const translateY = currentValue.length
      ? [`${currentValue.at(last)}`, `-=${this.oneFloorHeight}`]
      : [`-=${this.oneFloorHeight}`];
    this.anime.add({ translateY }, last); // -1 でないとアニメーションがちらつくため
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
