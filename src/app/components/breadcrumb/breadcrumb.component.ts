import { Component, OnInit } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { breadCrumb } from 'src/app/helpers/Helpers';

@Component({
  selector: 'app-breadcrumb',
  animations: breadCrumb,
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  breadcrumb = [
    { text: 'séries'},
    { text: 'temporadas' },
    { text: 'episódios' },
    { text: 'linguagem' },
    { text: 'qualidade' },
    { text: 'download' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
