import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { scaleInOut } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-fab-queue',
  animations: [ scaleInOut ],
  templateUrl: './fab-queue.component.html',
  styleUrls: ['./fab-queue.component.css']
})
export class FabQueueComponent implements OnInit {

  @Input() visible: boolean;
  @Input() icon: IconDefinition;
  @Input() state: string;

  @Output() click: EventEmitter<MouseEvent> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
