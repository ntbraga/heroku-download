import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NetcineService, Episode, Download, Language } from 'src/app/services/netcine.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IdGenerator } from 'src/app/helpers/Helpers';
import { selectedValues } from 'src/app/helpers/selecteds';

@Component({
  selector: 'app-qualities',
  templateUrl: './qualities.component.html',
  styleUrls: ['./qualities.component.css']
})
export class QualitiesComponent implements OnInit, AfterViewInit {
  selectedValues = selectedValues;
  corsSkipPrefix = NetcineService.corsSkipPrefix;
  private baseRedirect = 'http://p.netcine.us/redirecionar.php?data=';
  @Output() close: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() selected: EventEmitter<Download> = new EventEmitter();
  @Output() loaded: EventEmitter<Download[]> = new EventEmitter();
  @Input() language: Language;
  @Input() episode: Episode;

  constructor(private netcine: NetcineService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.netcine.getPageAsDocument(this.corsSkipPrefix + this.language.link).then((doc) => {
      this.requestPageCallback(doc);
    });
  }

  requestPageCallback(doc: Document) {
    this.netcine.loading = true;
    const frames = doc.getElementsByTagName('iframe');
    if (frames.length == 0) {
      const options = doc.getElementsByTagName('a');
      for (let i = 0; i < options.length; i++) {
        const link = options.item(i);
        const text = link.text.trim();
        let href = link.href;

        if (href == undefined || href == '') {
          href = link.getAttribute('onclick').match(/location\.href='(\S+)'/)[1];
        }

        href = href.replace(this.baseRedirect, '');

        if (text == '' || text.toLocaleLowerCase().includes('principal')) {
          this.netcine.getPageAsText(this.corsSkipPrefix + href).then((player) => {
            const regLink = /file: "(htt[p, ps]:\/\/\S+)\?/g;
            const match = player.match(regLink);
            console.log(match);
            if (match != undefined) {
              const downloads: Download[] = match.map((download) => {
                const mDown = download.match(/\/html\/(\S+)-(BAIXO|ALTO)(\.\S+)\?/);
                console.log(mDown);
                if (mDown != undefined) {
                  const item: Download = {
                    id: IdGenerator.getUniqueId(),
                    link: download.replace('file: "', ''),
                    text: mDown[1].split('/').splice(2, 3).join('-'),
                    format: mDown[3],
                    quality: mDown[2],
                    serie: selectedValues.selectedSerie.text,
                    episode: selectedValues.selectedEpisode.ep + ' ' + selectedValues.selectedEpisode.text,
                    language: selectedValues.selectedLanguage.text
                  };
                  return item;
                }
                return undefined;
              }).filter(Boolean);
              this.netcine.loading = false;
              this.loaded.emit(downloads);
            } else {
              this.requestPageCallback(this.netcine.getTextAsDocument(player));
            }
          });
        }
      }
    } else {
      this.netcine.getPageAsDocument(this.corsSkipPrefix + frames[0].src).then((doc1) => {
        this.requestPageCallback(doc1);
      });
    }
  }

  ngAfterViewInit() {

  }

  onLoad(event: Event, frame: HTMLIFrameElement) {
  }

  closeEvent(event) {
    this.close.emit(event);
  }

  emitSelected(download: Download) {
    selectedValues.selectedDownload = download;
    this.selected.emit(download);
  }

}
