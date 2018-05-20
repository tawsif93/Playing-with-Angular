import { Directive, Input, Output, EventEmitter,OnInit } from '@angular/core';
import { LoaderService } from '../loader.service'

@Directive({
  exportAs: 'toggle',
  selector: 'toggle, [toggle]',
})
export class ToggleDirective implements OnInit {
  @Input() _id: number;
  @Input() on: boolean;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();

  constructor(public loader: LoaderService ) {
  }
  setOnState(on: boolean) {
    this.on = on;
    this.toggle.emit(this.on);
    if (this.on) {
      this.loader.start(this._id);
    } else {
      this.loader.end(this._id);
    }
  }

  ngOnInit() {
    // console.log(this._id)
    this.loader.register(this._id).subscribe( ({_id, val}) => console.log(_id, val));
  }
}
