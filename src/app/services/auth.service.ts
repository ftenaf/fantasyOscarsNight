import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { NotifierService } from '../shared/services/notifier.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public notifierService: NotifierService,
    public router: Router,  
    public ngZone: NgZone
  ) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  async SignIn(email, password) {
    this.notifierService.info(email +": logado");
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
      this.SetUserData(result.user);
    }
    catch (error) {
      window.alert(error.message);
    }
  }

  async SignUp(email, password) {
    this.notifierService.info(email +": registrado");
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      this.SendVerificationMail();
      this.SetUserData(result.user);
    }
    catch (error) {
      window.alert(error.message);
    }
  }

  async SendVerificationMail() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['verify-email-address']);
  }

  async ForgotPassword(passwordResetEmail) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email sent, check your inbox.');
    }
    catch (error) {
      window.alert(error);
    }
  }

  GoogleAuth() {
    this.notifierService.info("logado con google");
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  async AuthLogin(provider) {
    try {
      const result = await this.afAuth.auth.signInWithPopup(provider);
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
      this.SetUserData(result.user);
    }
    catch (error) {
      window.alert(error);
    }
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  async SignOut() {
    this.notifierService.info("Desconectado"); 
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
}