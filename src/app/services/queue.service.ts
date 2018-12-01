import { Injectable, EventEmitter } from '@angular/core';
import { Runnable, RunningStatus, RunnableStatus, Runner } from '../helpers/runner';
import { Download, NetcineService } from './netcine.service';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  public runner: Runner<Download> = new Runner<Download>(new DownloadRunnable(this.netcine));

  constructor(private netcine: NetcineService) { }
}


export class DownloadRunnable implements Runnable<Download> {

  constructor(private netcine: NetcineService) { }

  run(value: Download): EventEmitter<RunningStatus<Download>> {
    const emitter: EventEmitter<RunningStatus<Download>> = new EventEmitter<RunningStatus<Download>>();

    this.netcine.downloadFile(value).subscribe((download: Download) => {
      emitter.emit({
        value: download,
        status: download.progress == undefined || !download.progress.finish ? RunnableStatus.RUNNING : RunnableStatus.FINISHED
      });
    });

    return emitter;
  }

  cancel(value: Download) {
    if (value != undefined && value.progress != undefined) {
      value.progress.cancel();
    }
  }

  remove(value: Download) {
    this.cancel(value);
  }


}
