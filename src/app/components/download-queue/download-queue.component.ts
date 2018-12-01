import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { QueueService } from 'src/app/services/queue.service';
import { scaleUpHorRight } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-download-queue',
  animations: scaleUpHorRight,
  templateUrl: './download-queue.component.html',
  styleUrls: ['./download-queue.component.css']
})
export class DownloadQueueComponent implements OnInit {
  @Input() visible: boolean;
  @Output() close: EventEmitter<MouseEvent> = new EventEmitter();

  constructor(private queue: QueueService) {

  }

  ngOnInit() {

  }

  closeEvent(event) {
    this.close.emit(event);
  }

}

