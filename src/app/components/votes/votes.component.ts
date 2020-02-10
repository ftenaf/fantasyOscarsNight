import { Component, OnInit, Input } from '@angular/core';
import { FantasyService } from 'src/app/services/fantasy.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls:  ['./votes.component.scss']
})
export class VotesComponent implements OnInit {

  @Input() userId;
  @Input() nomineeId;
  @Input() categoryId;

  votes: any;
  countVotes: number;

  constructor(public authService: AuthService, private fantasyService: FantasyService) { }

  ngOnInit() {
    this.fantasyService.getNomineeVotes(this.nomineeId).valueChanges().subscribe(arr => {
      this.votes = arr;
      this.countVotes = arr.length ? arr.length : 0
    });
  }

  starHandler() {
    this.fantasyService.setVote(this.userId, this.categoryId, this.nomineeId)
  }

}
