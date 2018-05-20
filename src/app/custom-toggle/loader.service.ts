import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {

  load: Subject<any>[] = [];
  constructor() { }

  register(id ) {
    this.load[id] = new Subject<boolean>();
// console.log(id)
    return this.load[id].asObservable();
  }

  start(id) {
    this.load[id].next({_id: id , val: true});
  }

  end(id) {
    this.load[id].next({_id: id , val: false});
  }
}