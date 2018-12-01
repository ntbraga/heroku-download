import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Serie, NetcineService, Temporada, Episode } from 'src/app/services/netcine.service';
import { selectedValues } from 'src/app/helpers/selecteds';
import { IdGenerator } from 'src/app/helpers/Helpers';

@Component({
  selector: 'app-temporadas',
  templateUrl: './temporadas.component.html',
  styleUrls: ['./temporadas.component.css']
})
export class TemporadasComponent implements OnInit {
  selectedValues = selectedValues;

  @Input() serie: Serie;
  @Output() close: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() selected: EventEmitter<Temporada> = new EventEmitter();
  @Output() loaded: EventEmitter<Temporada[]> = new EventEmitter();
  temporadas: Temporada[];

  constructor(private netcine: NetcineService) { }

  ngOnInit() {
    this.netcine.getPageAsDocument(this.serie.link).then((doc) => {
      const sub = doc.getElementById('cssmenu').getElementsByClassName('has-sub');
      this.temporadas = [];
      for (let i = 0; i < sub.length; i++) {
        const item = sub.item(i);
        const temp = item.getElementsByTagName('a')[0].text;
        const episodes = item.getElementsByTagName('li');
        const episodeList: Episode[] = [];

        for (let j = 0; j < episodes.length; j++) {
          const epi = episodes.item(j);
          const link = epi.getElementsByTagName('a')[0].href;
          const ep = epi.getElementsByClassName('datex')[0].textContent.trim();
          const text = epi.getElementsByClassName('datix')[0].textContent.trim();
          const duration = epi.getElementsByTagName('i')[0].textContent.trim();

          episodeList.push({
            id: IdGenerator.getUniqueId(),
            text: text,
            ep: ep,
            link: link,
            duration: duration
          });

        }

        this.temporadas.push({
          id: IdGenerator.getUniqueId(),
          text: temp,
          episodes: episodeList
        });
      }
      this.loaded.emit(this.temporadas);
    });
  }

  emitSelected(temporada: Temporada) {
    selectedValues.selectedTemporada = temporada;
    this.selected.emit(temporada);
  }

  closeEvent(event) {
    this.close.emit(event);
  }


}
