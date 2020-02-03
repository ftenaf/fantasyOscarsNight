import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private _notification: BehaviorSubject<string> = new BehaviorSubject(null);
  // readonly notification$: Observable<string> = this._notification.asObservable().publish().refCount();

  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  };

  success(message: any) {
    this.config.panelClass = ['notification', 'success'];
    this.openSnackBar(message);
  }

  warn(message: any) {
    this.config.panelClass = ['notification', 'warn'];
    this.openSnackBar(message);
  }

  error(message: any) {
    console.error(message);
    this.config.panelClass = ['notification', 'error'];
    this.openSnackBar(message);
  }

  info(message: any) {
    this.config.panelClass = ['notification', 'info'];
    this.openSnackBar(message);
  }

  private openSnackBar(message: any) {
    this._notification.next(message);
    this.zone.run(() => {
      this.snackBar.open(message, 'X', this.config);
      setTimeout(() => this._notification.next(null), this.config.duration);
    });
  }

  /*
    this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                html: ''
              },
              duration: 15000
            });
  */
}
