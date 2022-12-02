import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.css']
})
export class DarkModeComponent implements OnInit {

  constructor(private darkMode:DarkModeService) { }

  ngOnInit(): void {
  }
  
  toggleDark(){
    this.darkMode.toggleDarkTheme();
  }

}
