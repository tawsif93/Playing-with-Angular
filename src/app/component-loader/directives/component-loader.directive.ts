import { ComponentLoaderService } from './../services/component-loader.service';
import { Directive, Input, EventEmitter, Output, ElementRef, OnInit, ViewContainerRef, ComponentFactoryResolver,
   ComponentRef,
   ViewChild,
   Renderer2, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderComponent } from '../loader/loader.component';

@Directive({
  selector: '[appComponentLoader]'
})
export class ComponentLoaderDirective implements OnInit {

  // @ViewChild('appComponentLoader', {read: ViewContainerRef}) viewContainer: ViewContainerRef;
  // tslint:disable-next-line:no-input-rename
  @Input('appComponentLoader') _id: string;
  @Input() on: boolean;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();

  public componentRef: ComponentRef<LoaderComponent>;

  constructor(el: ElementRef,
        private sanitizer: DomSanitizer,
        private elementRef: ElementRef,
        private vcRef: ViewContainerRef,
        private renderer: Renderer2,
        private componentFactoryResolver: ComponentFactoryResolver,
        public loaderService: ComponentLoaderService ) {

    // this.elementRef.nativeElement.innerHTML = 'lkasdjd';
  }

  setOnState(on: boolean) {
    this.on = on;
    this.toggle.emit(this.on);
    // if (this.on) {
    //   this.loaderService.start(this._id);
    // } else {
    //   this.loaderService.end(this._id);
    // }
    this.componentRef.instance.on = this.on;
  }
  ngOnInit() {
    // console.log(this._id)

    this.loaderService.register(this._id).subscribe( ({_id, val}) => {
       console.log(_id, val);
       this.setOnState(val);
    } );

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoaderComponent);
    this.componentRef = this.vcRef.createComponent(componentFactory);
    // this.componentRef.instance.loaderDirective = this;
    this.renderer.appendChild(
      this.vcRef.element.nativeElement,
      this.componentRef.injector.get(LoaderComponent)
   );
  }

}
