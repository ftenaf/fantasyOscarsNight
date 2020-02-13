import {
  Injectable
} from '@angular/core';
import {
  AngularFirestore
} from '@angular/fire/firestore';

import {
  combineLatest
} from 'rxjs';
import {
  map, catchError
} from 'rxjs/operators';
import {
  Nominee,
  OscarsResponse,
} from 'src/app/models/oscars.model';
import {
  HttpClient
} from '@angular/common/http';

import data from 'src/assets/nominees.json';
import {
  AngularFireFunctions
} from '@angular/fire/functions';
import {
  NotifierService
} from '../shared/services/notifier.service';

export interface Star {
  userId: string;
  nomineeId: string;
  value: number;
}

export interface Like {
  userId: string;
  categoryId: string;
  nomineeId: string;
}

export interface Vote {
  userId: string;
  categoryId: string;
  nomineeId: string;
}

@Injectable({
  providedIn: 'root'
})
export class FantasyService {
  oscarsResponse: OscarsResponse;

  constructor(private firestore: AngularFirestore, private fns: AngularFireFunctions, private http: HttpClient, private notifierService: NotifierService) {
  }

  getNominees() {
    // this.oscarsResponse = data;
    // return of(this.oscarsResponse);    
    return this.firestore.collection('nominees', ref => ref.orderBy('order')).snapshotChanges().pipe(catchError(x => data));
    
  }

  getUserStars(userId: string) {
    const starsRef = this.firestore.collection('stars', ref => ref.where('userId', '==', userId));
    return starsRef.valueChanges();
  }

  getMovieStars(nomineeId: string) {
    const starsRef = this.firestore.collection('stars', ref => ref.where('nomineeId', '==', nomineeId));
    return starsRef.valueChanges();
  }

  setStar(userId: string, nomineeId: string, value: number) {
    const star: Star = {
      userId,
      nomineeId,
      value
    };
    const starPath = `stars/${star.userId}_${star.nomineeId}`;
    return this.firestore.doc(starPath).set(star)
  }

  setLike(userId: string, categoryId: string, nomineeId: string) {
    const like: Like = {
      userId,
      categoryId,
      nomineeId
    };
    const likePath = `likes/${like.userId}_${like.categoryId}`;
    return this.firestore.doc(likePath).set(like)
  }

  getUserLikes(userId: string) {
    const likesRef = this.firestore.collection('likes', ref => ref.where('userId', '==', userId));
    return likesRef.valueChanges();
  }

  getNomineeLikes(nomineeId: string) {
    const likesRef = this.firestore.collection('likes', ref => ref.where('nomineeId', '==', nomineeId));
    return likesRef;
  }

  setVote(userId: string, categoryId: string, nomineeId: string) {
    const vote: Vote = {
      userId,
      categoryId,
      nomineeId
    };
    const votePath = `votes/${vote.userId}_${vote.categoryId}`;
    return this.firestore.doc(votePath).set(vote)
  }

  getUserVotes(userId: string) {
    const votesRef = this.firestore.collection('votes', ref => ref.where('userId', '==', userId));
    return votesRef.valueChanges();
  }

  getUserPoints(userId: string) {
    const votesRef$ = this.firestore.collection('votes', ref => ref.where('userId', '==', userId)).valueChanges();
    const nominees$ = this.firestore.collection('nominees').valueChanges();
    return combineLatest(votesRef$, nominees$).pipe(
      map(([votes, nominees]) => {
        let count = 0;
        nominees.forEach(nominee => {
          (nominee as Nominee).result.forEach(result => {
            votes.forEach(vote => {
              if (result.post_name === (vote as Vote).nomineeId && result.winner) {
                count++;
              }
            });
          });
        });
        console.log("puntos de " + userId + ":" + count)
        return count;
      })
    );
  }

  getNomineeVotes(nomineeId: string) {
    const votesRef = this.firestore.collection('votes', ref => ref.where('nomineeId', '==', nomineeId));
    return votesRef;
  }


}
