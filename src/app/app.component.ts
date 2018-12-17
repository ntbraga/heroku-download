import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NetcineService, Serie, Temporada, Episode } from './services/netcine.service';
import { IdGenerator, enterAnimationRightToLeft } from './helpers/helpers';
import { selectedValues } from './helpers/selecteds';
import { faTasks, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { QueueService } from './services/queue.service';

@Component({
  selector: 'app-root',
  animations: enterAnimationRightToLeft,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'heroku-download';
  series: Serie[];
  query;
  selectedValues = selectedValues;
  queueVisible = false;
  faTasks = faTasks;
  faTimes = faTimes;
  faSearch = faSearch;

  constructor(private netcine: NetcineService, private queue: QueueService) {
  }

  ngOnInit(): void {
  }

  search() {
    this.netcine.searchSerie(this.query).then((doc) => {
      const result = doc.getElementById('box_movies').getElementsByClassName('movie');
      this.series = [];
      for (let i = 0; i < result.length; i++) {
        const item = result.item(i);
        this.series.push({
          text: item.getElementsByTagName('h2')[0].textContent,
          link: item.getElementsByClassName('imagen')[0].getElementsByTagName('a')[0].href,
          id: IdGenerator.getUniqueId()
        });
      }
    });
  }

  onSelectedSerie(serie: Serie) {
    selectedValues.selectedSerie = serie;
  }

  onSelectedTemporada(temporada: Temporada) {
    selectedValues.selectedTemporada = temporada;
  }

  closeTemporada() {
    selectedValues.selectedSerie = undefined;
    selectedValues.selectedTemporada = undefined;
    selectedValues.selectedEpisode = undefined;
  }

  closeAll() {
    Object.keys(selectedValues).forEach((key) => {
      selectedValues[key] = undefined;
    });
  }

  onSelectedEpisode(episode: Episode) {
    selectedValues.selectedEpisode = episode;
  }

  isMobile(): boolean {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 768;
  }

}
