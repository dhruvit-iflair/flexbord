import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {NgModel,FormControlName} from '@angular/forms';
// import {} from '@types/googlemaps';
declare var google:any;

@Directive({
  selector: '[Googleplace]',
  providers: [FormControlName],
  host: {
    '(input)' : 'onInputChange()'
  }
})
export class GoogleplaceDirective {

   @Output() setAddress: EventEmitter<any> = new EventEmitter();
  modelValue:any;
  autocomplete:any;
  private _el:HTMLElement;


  constructor(el: ElementRef,private model:FormControlName) {
    this._el = el.nativeElement;
    this.modelValue = this.model;
    var input = this._el;

    this.autocomplete = new google.maps.places.Autocomplete(input, {});
    google.maps.event.addListener(this.autocomplete, 'place_changed', ()=> {
      var place = this.autocomplete.getPlace();
      this.invokeEvent(place);

    });
  }

  invokeEvent(place:Object) {
    this.setAddress.emit(place);
  }

  onInputChange() {
  }
}