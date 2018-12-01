import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Download, NetcineService, DownloadProgress } from 'src/app/services/netcine.service';
import { faDownload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { QueueService } from 'src/app/services/queue.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  @Input() download: Download;
  @Output() close: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() queued: EventEmitter<Download> = new EventEmitter();
  progress: DownloadProgress;

  faDownload = faDownload;
  faPlus = faPlus;

  constructor(private netcine: NetcineService, private queue: QueueService) { }

  ngOnInit() {

  }

  downloadFile() {
    window.location.href = this.download.link;
  }

  openHere() {
    this.queue.runner.addToQueue(this.download).then((response) => {
      console.log('response', response);
      this.queued.emit(this.download);
    }).catch((err) => {
      console.error(err);
    });
    // this.netcine.downloadFile(this.download).subscribe((download) => {
    //   this.progress = download.progress;
    //   if (this.progress.finish) {
    //     saveAs(this.progress.content, download.text + download.format);
    //   }
    // });
  }

  closeEvent(event) {
    if (this.progress != undefined) {
      this.progress.cancel();
    }
    this.close.emit(event);
  }

}
