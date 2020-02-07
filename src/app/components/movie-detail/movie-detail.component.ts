import {
  Component,
  OnInit,
  Inject,
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import {
  FormControl,
} from '@angular/forms';

import {
  ResultEntity
} from 'src/app/models/oscars.model';
import {
  TmdbService
} from 'src/app/services/tmdb.service';
import {
  Movie,
  MovieDetailsResponse,
  Cast
} from 'src/app/models/tmdb.model';
import {
  environment
} from 'src/environments/environment';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  public _data: ResultEntity = null;
  public item: Movie;

  movieDetail: MovieDetailsResponse;
  castArray: Array < Cast > ;
  private searchResultsPage = 1;
  private maxSearchResultsCount = 5;
  private debounceTimeout = 400;
  searchResults: Array < Movie > ;
  term = new FormControl();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResultEntity,
    public tmdbService: TmdbService,
    public dialogRef: MatDialogRef < MovieDetailComponent > ,
    private route: ActivatedRoute
  ) {
    this._data = data;
    if (!data.tmdb_id) {
      this.searchMovies(data.post_title);
    } else {
      this.tmdbService.getMovieDetails(data.tmdb_id).subscribe(x => {
        this.movieDetail = x;
      });
    }
  }

  getCountryFlag = (countryCode) => "flag-icon-" + countryCode.iso_3166_1.toLowerCase();
  
  getPosterUrl = () => this.movieDetail && this.movieDetail.poster_path === null ?
    '/assets/images/poster-not-found.jpg' :
    environment.poster_url_prefix + this.movieDetail.poster_path;

  getPosterUrlBg = () => this.movieDetail ? "background-image: url(" + this.movieDetail.poster_path === null ?
    '/assets/images/poster-not-found.jpg' :
    environment.poster_url_prefix + this.movieDetail.poster_path +
    ")" : "";

  getMoney = (numero) => numero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  getCastPersonUrl = (imageSuffix: string, gender: number) => imageSuffix === null ?
    `/assets/images/${gender === 0 ? 'unknown.svg': gender === 1 ? 'fe' : 'male.png'}` :
    environment.poster_url_prefix + imageSuffix

  private searchMovies(query: string) {
    if (!query) {
      this.searchResults = [];
    } else {

      this.tmdbService
        .searchForMovies(query, this.searchResultsPage)
        .subscribe(result => {
          const _ = result.results.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
          this.item = _[0];
          this.tmdbService.getMovieDetails(this.item.id).subscribe(x => {
            // console.log(x);
            this.movieDetail = x;
          });
          this.searchResults = result.results.slice(0, this.maxSearchResultsCount);
          console.log(result);
        });
    }
  }

  getImdbUrl = () => this.movieDetail ? "https://www.imdb.com/title/" + this.movieDetail.imdb_id : "#";

  ngOnInit() {

    if (!this._data) {} else {}
  }

  onClose() {
    this.dialogRef.close();
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}

}
