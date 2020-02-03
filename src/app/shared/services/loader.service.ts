import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
 
  private timeout: any;
  public isLoading = new BehaviorSubject(false);
  constructor() { }


  setLoading(val: boolean): void {
    console.log("Loading: "+ val);
    if (!val) {
      this.timeout = setTimeout(() => {
        this.isLoading.next(val);
      }, 300);
    } else {
      clearTimeout(this.timeout);
      this.isLoading.next(val);
    }
  }
}