import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  constructor() { }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
 }

}
