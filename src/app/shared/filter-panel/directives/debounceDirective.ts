import { Directive, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

@Directive({
  selector: '[ngModel][debounce]',
})
export class DebounceDirective implements OnInit {
  @Output()
  public onDebounce = new EventEmitter<any>();

  @Input('debounce')
  public debounceTime: number = 500;

  private isFirstChange: boolean = true;

  constructor(private elementRef: ElementRef, private model: NgModel) {
  }

  ngOnInit() {
    const eventStream = Observable.fromEvent(this.elementRef.nativeElement, 'keyup')
      .map(() => {
        return this.model.value;
      })
      .debounceTime(this.debounceTime);

    const blurStream = Observable.fromEvent(this.elementRef.nativeElement, 'blur').map(() => {
      return this.model.value;
    })

    this.model.viewToModelUpdate = () => { };

    eventStream.subscribe(input => {
      this.model.viewModel = input;
      this.model.update.emit(input);
    });

    blurStream.subscribe(input => {
      this.model.viewModel = input;
      this.model.update.emit(input);
    });
  }
}