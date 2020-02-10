import { Component, OnInit, Input } from '@angular/core';
import { FantasyService } from 'src/app/services/fantasy.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

  @Input() userId;
  @Input() nomineeId;
  @Input() categoryId;

  likes: any;
  countLikes: number;

  constructor(public authService: AuthService, private fantasyService: FantasyService) { }

  ngOnInit() {
    this.fantasyService.getNomineeLikes(this.nomineeId).valueChanges().subscribe(arr => {
      this.likes = arr;
      this.countLikes = arr.length ? arr.length : 0
    });
  }

  starHandler() {
    this.fantasyService.setLike(this.userId, this.categoryId, this.nomineeId)
  }

}
