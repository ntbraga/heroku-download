import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Episode, NetcineService, Language } from 'src/app/services/netcine.service';
import { IdGenerator } from 'src/app/helpers/helpers';
import { selectedValues } from 'src/app/helpers/selecteds';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  @Input() episodio: Episode;
  @Output() close: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() selected: EventEmitter<Language> = new EventEmitter();
  @Output() loaded: EventEmitter<Language[]> = new EventEmitter();
  selectedValues = selectedValues;

  constructor(private netcine: NetcineService) { }

  ngOnInit() {
    this.netcine.getPageAsDocument(this.episodio.link).then((doc) => {
      const container = doc.getElementById('player-container');
      const language = container.getElementsByTagName('a');
      const languages: Language[] = [];
      for (let i = 0; i < language.length; i++) {
        const ql = language.item(i);
        const hash = ql.hash.replace('#', '');
        const iframe = doc.getElementById(hash).getElementsByTagName('iframe')[0];
        languages.push({
          id: IdGenerator.getUniqueId(),
          text: ql.text.trim(),
          hash: hash,
          link: iframe.src
        });
      }
      this.loaded.emit(languages);
    });
  }


  emitSelected(language: Language) {
    selectedValues.selectedLanguage = language;
    this.selected.emit(language);
  }

  closeEvent(event) {
    this.close.emit(event);
  }

}
