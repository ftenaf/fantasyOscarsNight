import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import {
  MovieApiResult,
  MovieDetailsResponse,
  Movie
} from 'src/app/models/tmdb.model';
import {
  environment
} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private http: HttpClient) {}

  searchForMovies(query: string, page = 1): Observable < MovieApiResult > {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString());

    return this.http.get < MovieApiResult > (`${environment.movieDbUrl}/search/movie`, {
      params: params
    });
  }

  getMovieDetails(movie_id: number): Observable < MovieDetailsResponse > {
    const params = new HttpParams()
      .set('append_to_response', 'credits');
    return this.http.get < MovieDetailsResponse > (`${environment.movieDbUrl}/movie/${movie_id}`, {
      params: params
    });

  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  sortMovieDetailsByDate(movies: MovieDetailsResponse[]): MovieDetailsResponse[] {
    return movies.sort((a, b) => {
      const dateA = new Date(a.release_date),
        dateB = new Date(b.release_date);
      return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
    });
  }
}
