import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Episode, Temporada } from 'src/app/services/netcine.service';
import { selectedValues } from 'src/app/helpers/selecteds';

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.css']
})
export class EpisodiosComponent implements OnInit {
  selectedValues = selectedValues;

  @Input() temporada: Temporada;
  @Output() close: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() selected: EventEmitter<Episode> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  emitSelected(episode: Episode) {
    selectedValues.selectedEpisode = episode;
    this.selected.emit(episode);
  }

  closeEvent(event) {
    this.close.emit(event);
  }

}
