import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  exports: [MatButtonModule, MatIconModule, MatSlideToggleModule],
})
export class MaterialsModule {}
