import { Directive ,ElementRef,forwardRef,Input,OnChanges,OnInit} from '@angular/core';
import { FormControl,ControlValueAccessor, NG_VALUE_ACCESSOR  } from "@angular/forms";

declare const window :any;

@Directive({
  selector: '[appCkEditor]',
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CkEditorDirective),
      multi: true
    }
  ]
})
export class CkEditorDirective implements OnInit {

  @Input('value') vv :any;
   
  public onChange: any = () => { };
  public onTouched: any = () => { };
  constructor(private el : ElementRef) {  }
  ngOnInit(){
      if(window.CKEDITOR) {
          var ck = window.CKEDITOR.replace(this.el.nativeElement.id);
          var self = this;
          ck.on('change',function(){self.onChange(window.CKEDITOR.instances[self.el.nativeElement.id].getData())});
      }
  }

  get value() {
    return this.vv;
  }

  set value(val) {
    this.vv = val;
    this.onChange(val);
    this.onTouched();
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
      this.vv = value;
      window.CKEDITOR.instances[this.el.nativeElement.id].setData(value);
      this.onChange(value);
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
