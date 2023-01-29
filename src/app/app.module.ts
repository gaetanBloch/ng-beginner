import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquareComponent } from './components/square/square.component';
import { BoardComponent } from './components/board/board.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GetClassPipe } from './pipes/get-class.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    BoardComponent,
    GetClassPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
