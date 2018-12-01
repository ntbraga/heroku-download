import { Serie, Temporada, Episode, Language, Download } from '../services/netcine.service';

class Selecteds {
    public selectedSerie: Serie;
    public selectedTemporada: Temporada;
    public selectedEpisode: Episode;
    public selectedLanguage: Language;
    public selectedDownload: Download;
}

export const selectedValues = new Selecteds();

