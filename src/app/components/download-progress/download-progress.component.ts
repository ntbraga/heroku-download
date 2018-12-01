import { Component, OnInit, Input } from '@angular/core';
import { Download } from 'src/app/services/netcine.service';
import { Running } from 'src/app/helpers/runner';

@Component({
  selector: 'app-download-progress',
  templateUrl: './download-progress.component.html',
  styleUrls: ['./download-progress.component.css']
})
export class DownloadProgressComponent implements OnInit {

  @Input() download: Running<Download>;

  constructor() { }

  ngOnInit() {
    console.log(this.download.value);
  }

}
