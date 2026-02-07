import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SaveTheDateComponent } from './components/save-the-date/save-the-date.component';
import { ConviteComponent } from './components/convite/convite.component';
import { FlashTattooComponent } from './components/flash-tattoo/flash-tattoo.component';
import { LocalComponent } from './components/local/local.component';
import { HospedagemComponent } from './components/hospedagem/hospedagem.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    SideMenuComponent,
    SaveTheDateComponent,
    ConviteComponent,
    FlashTattooComponent,
    LocalComponent,
    HospedagemComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Eduardo & Maiara';
}
