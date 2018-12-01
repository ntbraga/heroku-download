import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Indexed } from '../helpers/runner';

@Injectable({
  providedIn: 'root'
})
export class NetcineService {
  public static corsSkipPrefix = 'http://cors-anywhere.herokuapp.com/';
  private domParser: DOMParser;
  private seriesUrl = 'http://netcine.us/tvshows/?s=';
  private corsSkipPrefix = NetcineService.corsSkipPrefix;

  public loading;

  constructor(private http: HttpClient, private pureHttp: Http) {
    this.domParser = new DOMParser();
    this.loading = false;
  }

  public searchSerie(query) {
    return this.getPageAsDocument(this.seriesUrl + query);
  }

  public getPageAsDocument(page: string): Promise<Document> {
    this.loading = true;
    return this.getPageAsText(page)
      .then((res: string) => {
        this.loading = false;
        return this.getTextAsDocument(res);
      }).catch((err) => {
        this.loading = false;
        return err;
      });
  }

  public getTextAsDocument(content: string, type: SupportedType = 'text/html'): Document {
    return this.domParser.parseFromString(content, type);
  }

  public getPageAsText(page: string): Promise<string> {
    return this.http
      .get(page, { responseType: 'text' })
      .toPromise();
  }

  public get(page: string): Promise<Response> {
    return fetch(this.corsSkipPrefix + page);
  }

  public downloadFile(download: Download): Observable<Download> {
    const progress: DownloadProgress = {
      loaded: 0,
      total: 0,
      percent: '0',
      type: -1,
      finish: false,
      url: download.link,
      status: DownloadStatus.STARTED
    };
    download.progress = progress;
    const subject = new BehaviorSubject<Download>(download);
    const request = new HttpRequest('GET', this.corsSkipPrefix + download.link, {
      reportProgress: true,
      responseType: 'blob'
    });
    let subscription: Subscription;

    progress.cancel = () => {
      if (subscription != undefined) {
        subscription.unsubscribe();
        return true;
      }
      return false;
    };

    subscription = this.http.request<Blob>(request).subscribe((res) => {
      progress.type = res.type;
      progress.event = res;
      switch (res.type) {
        case HttpEventType.ResponseHeader: {
          progress.start = new Date();
          progress.status = DownloadStatus.DOWNLOADING;
          break;
        }
        case HttpEventType.DownloadProgress: {
          progress.loaded = res.loaded;
          progress.total = res.total;
          progress.percent = (100 * res.loaded / res.total).toFixed(2);
          break;
        }
        case HttpEventType.Response: {
          progress.finish = true;
          progress.content = res.body;
          progress.status = DownloadStatus.FINISHED;
          break;
        }
      }
      subject.next(download);
    });

    return subject.asObservable();
  }

}

export enum DownloadStatus {
  STARTED = 0,
  DOWNLOADING = 1,
  FINISHED = 2
}

export interface DownloadProgress {
  loaded: number;
  total: number;
  percent: string;
  type: HttpEventType;
  url: string;
  status: DownloadStatus;
  start?: Date;
  event?: HttpEvent<Blob> | HttpResponse<Blob>;
  finish?: boolean;
  content?: Blob;
  cancel?: () => boolean;
}

export interface Language {
  hash: string;
  text: string;
  id: string;
  link: string;
  downloads?: Download[];
}

export interface Serie {
  text: string;
  link: string;
  id: string;
  temporadas?: Temporada[];
}

export interface Temporada {
  id: string;
  text: string;
  episodes: Episode[];
}

export interface Episode {
  id: string;
  ep: string;
  text: string;
  link: string;
  duration: string;
  languages?: Language[];
}

export interface Download extends Indexed {
  id: string;
  text: string;
  link: string;
  format: string;
  quality: string;
  serie: string;
  episode: string;
  language: string;
  progress?: DownloadProgress;
}
