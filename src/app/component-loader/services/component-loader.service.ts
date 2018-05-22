import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ComponentLoaderService {

  loaders: Subject<any>[] = [];
  constructor() { }

  register(id ) {

    if ( !this.loaders[id] ) {
      this.loaders[id] = new Subject<boolean>();
// console.log(id)
    }
    return this.loaders[id].asObservable();
  }

  start(id) {
    this.loaders[id].next({_id: id , val: true});
  }

  end(id) {
    this.loaders[id].next({_id: id , val: false});
  }

}
