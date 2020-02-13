import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  NotifierService
} from 'src/app/shared/services/notifier.service';
import { FantasyService } from 'src/app/services/fantasy.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userPoints$: Observable<number>;
  userData$: Observable<firebase.User>;

  constructor(    
    public afAuth: AngularFireAuth
    ,public authService: AuthService
    , public fantasyService: FantasyService
    , public notifierService: NotifierService) {
    this.userData$ = this.afAuth.authState;
    this.userData$.subscribe(user => {
      this.userPoints$ = this.fantasyService.getUserPoints(user.uid);
    })
   }

  ngOnInit() {
  }


  shuffle(array) {
    const length = array == null ? 0 : array.length
    if (!length) {
      return []
    }
    let index = -1
    const lastIndex = length - 1
    const result = this.copyArray(array)
    while (++index < length) {
      const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
      const value = result[rand]
      result[rand] = result[index]
      result[index] = value
    }
    return result
  }
  
  copyArray(source) {
    let index = -1
    const length = source.length
  
    let array = new Array(length);
    while (++index < length) {
      array[index] = source[index]
    }
    return array
  }
}
