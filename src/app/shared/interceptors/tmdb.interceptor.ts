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
import { Environment } from '../../../environments/environment-variables';
@Injectable()
export class TMDBInterceptor implements HttpInterceptor {

  tmdb: string = ""; // Environment.FANTOS_tmdbkey;

  constructor(private fns: AngularFireFunctions) {
    // const callable = fns.httpsCallable('tmdb_api_key');
    // console.log("--------->Calling tmdbkey");
    // callable(JSON.stringify({data: ""})).subscribe(x => {
    //   console.log("tmdbkey");
    //   console.log(x);
    //   this.tmdb = x.result.tmdb_api_key;
    // });
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
