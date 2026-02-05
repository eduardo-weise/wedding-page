import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  isOpen = false;
  
  menuItems = [
    { id: 'save-the-date', label: 'Save the Date', icon: '🏠' },
    { id: 'convite', label: 'Convite', icon: '💌' },
    { id: 'flash-tattoo', label: 'Flash Tattoo', icon: '✨' },
    { id: 'local', label: 'Local', icon: '📍' }
  ];
  
  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }
  
  closeMenu(): void {
    this.isOpen = false;
  }
  
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.closeMenu();
    }
  }
}
