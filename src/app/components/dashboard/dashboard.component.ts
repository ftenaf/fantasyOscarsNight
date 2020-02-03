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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthService, public notifierService: NotifierService) {}

  ngOnInit() {}

}
