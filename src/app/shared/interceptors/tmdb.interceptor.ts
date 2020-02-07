import {
  Injectable
} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';

import {
  environment
} from 'src/environments/environment.prod';
import {
  AngularFireFunctions
} from '@angular/fire/functions';

@Injectable()
export class TMDBInterceptor implements HttpInterceptor {

  tmdb: string = "";

  constructor(private fns: AngularFireFunctions) {
    // const callable = fns.httpsCallable('tmdbapikey');
    // callable({}).subscribe(x => this.tmdb = x);
  }

  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    if (req.url.startsWith(environment.movieDbUrl)) {
      req = req.clone({
        url: req.url + `${req.url.indexOf('?') > -1 ? '&' : '?'}api_key=${this.tmdb}`
      });
    }
    return next.handle(req);
  }
}
