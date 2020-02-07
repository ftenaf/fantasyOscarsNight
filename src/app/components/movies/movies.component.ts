import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { TmdbService } from 'src/app/services/tmdb.service';
import { Movie } from 'src/app/models/tmdb.model'
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ResultEntity } from 'src/app/models/oscars.model';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
 
  displayedColumns: string[] = ['id', 'title', 'release_date'];
  dataSource: MatTableDataSource<Movie>;

  private searchResultsPage = 1;
  private maxSearchResultsCount = 20;
  private debounceTimeout = 400;
  term = new FormControl();

  constructor(public dialogForm: MatDialog,
    public loaderService: LoaderService, private tmdbService: TmdbService) {
    this.term.valueChanges
    .pipe(debounceTime(this.debounceTimeout))
    .pipe(distinctUntilChanged())
    .subscribe(searchQuery => this.searchMovies(searchQuery));
  }                  

  private searchMovies(query: string) {
    if ( !query ) {
      this.dataSource = new MatTableDataSource();         
    } else {
      this.loaderService.setLoading(true);
      this.tmdbService
      .searchForMovies(query, this.searchResultsPage)
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result.results.slice(0, this.maxSearchResultsCount));
      });
      this.loaderService.setLoading(false);
  }}

  endOfSearching() {
    // this.term.reset();
  }
  
  onUpdate(item: Movie) {
    const dialogFormConfig = new MatDialogConfig();
    dialogFormConfig.disableClose = true;
    dialogFormConfig.autoFocus = true;
    dialogFormConfig.width = '80%';
    const entity = item as unknown as ResultEntity;
    entity.tmdb_id = item.id;
    dialogFormConfig.data = entity;
    this.dialogForm.open(MovieDetailComponent, dialogFormConfig);
    // this.dialogForm.afterAllClosed.pipe(
    //   first(),
    //   // takeUntil(this.onDestroy)
    // ).subscribe(() => this.getNominees());
  }
  ngOnInit() {
  }

}
