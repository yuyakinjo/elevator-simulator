import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialsModule } from './modules/materials.module';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [AppComponent, SortPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
