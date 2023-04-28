import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CounterModule } from './shared/counter/counter.module';
import { PriceModule } from './shared/price/price.module';

@NgModule({
  declarations: [AppComponent,],
  imports: [BrowserModule, CounterModule, PriceModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
