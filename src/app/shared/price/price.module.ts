import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceComponent } from './price.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PriceSymbolPipe } from './price-symbol.pipe';

@NgModule({
  declarations: [PriceComponent, PriceSymbolPipe],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [PriceComponent],
})
export class PriceModule { }
