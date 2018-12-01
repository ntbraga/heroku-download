import { Component, OnInit } from '@angular/core';
import { scaleUpBl } from 'src/app/helpers/helpers';
import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-config',
  animations: [ scaleUpBl ],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  faCog = faCog;
  faTimes = faTimes;

  constructor() { }

  ngOnInit() {
  }

}
