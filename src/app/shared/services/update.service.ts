import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  environment
} from 'src/environments/environment';
import {
  interval
} from 'rxjs';
import {
  startWith,
  switchMap,
  filter,
  retryWhen,
  delay
} from 'rxjs/operators';
import { NotifierService } from './notifier.service';

interface VersionInfo {
  info: string;
  version: string;
  hash: string;
}
@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private config = {
    interval: 1000 * 60 * 5, //5 minutes
    path: '/version.json'
  };
  private currentVersion: string = undefined;
  constructor(private http: HttpClient, public notifierService: NotifierService) {
    if (environment.production) {
      interval(this.config.interval)
        .pipe(
          startWith(this.http.get(this.config.path)),
          switchMap(() => this.http.get(this.config.path)),
          filter(
            (version: VersionInfo) => version && version.hasOwnProperty('info')
          ),
          retryWhen(errors => errors.pipe(delay(this.config.interval)))
        )
        .subscribe(
          (version: VersionInfo) => {
            if (this.currentVersion === undefined) {
              this.currentVersion = version.info;
            } else {
              if (
                this.currentVersion !== version.info 
                // && this.updateModal === undefined
              ) {
                this.notifierService.info("Actualizando versión");
                location.reload(true);
              }
            }
          },
          error => {}
        );
    }
  }
}
