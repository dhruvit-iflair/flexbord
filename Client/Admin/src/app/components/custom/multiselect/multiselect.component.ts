import { Component, OnInit,Input,Output,EventEmitter,forwardRef, AfterViewInit,OnChanges,ViewChild,ElementRef} from '@angular/core';
import { FormControl,ControlValueAccessor, NG_VALUE_ACCESSOR  } from "@angular/forms";
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true
    }
  ]
})
export class MultiselectComponent implements ControlValueAccessor,AfterViewInit, OnChanges {
  @Input() mArray: any;
  @Input() mId: string ;
  @Input() mValue: any;
  @Input() mDisplay:any ;
  @Input('placeholder') placeholder:String;
  @Input() isSearch:Boolean;
  @Input() selectedVal:any;
  @Input('value') _value :any;
  
  public onChange: any = () => { };
  public onTouched: any = () => { };
  public readyToEmit : Boolean = false;
  
  public textBoxValue: any;
  public currentSelectedArray:Array<any>;
  public valueNeedToSend : Array<any> = [];
  public valueNeedToDisplay : Array<any> = [];
  public searchFilter : string;
  @Output('multiselectOutput') multiselectOutput = new EventEmitter<any>();

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor() { }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value && value.length > 0) {
      this._value = value;
      this.onChange(value);
      if (this._value.length > 0) {
        for (let index = 0; index < this._value.length; index++) {
          this.selectVal(this._value[index]);          
          if (index == this._value.length -1) {
            this.readyToEmit = true;
          }
        }
      }      
    }   
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  
  ngOnInit() {
    this.currentSelectedArray = this.mArray;
  }
  ngAfterViewInit(){}
  ngOnChanges(){}
  selectVal(id:any){
    var d = this.valueNeedToSend.indexOf(id);
    var insterd = this.mArray.findIndex(r =>r[this.mId] == id);
    var s = this.valueNeedToDisplay.indexOf(this.mArray[insterd][this.mDisplay]);   
    if (d > -1) {
      this.valueNeedToSend.splice(d,1);
      this.valueNeedToDisplay.splice(s,1);
    } else {
      this.valueNeedToSend.push(this.mArray[insterd][this.mId]);
      this.valueNeedToDisplay.push(this.mArray[insterd][this.mDisplay]);
    }
    // if (this.readyToEmit || this._value) {
      // this.multiselectOutput.emit(this.valueNeedToSend); 
      this.onChange(this.valueNeedToSend);      
    // }
  }
  removeFromSpan(text:any){
    var insterd = this.mArray.findIndex(r =>r[this.mDisplay] == text);
    var d = this.valueNeedToSend.indexOf(this.mArray[insterd][this.mId]);
    var s = this.valueNeedToDisplay.indexOf(text);   
    if (s > -1) {
      this.valueNeedToSend.splice(d,1);
      this.valueNeedToDisplay.splice(s,1);    
    }
    // if (this.readyToEmit || this._value) {
    //   this.multiselectOutput.emit(this.valueNeedToSend);      
      this.onChange(this.valueNeedToSend);
    // }
  }
  filter(){
    if (this.searchFilter != '') {
     this.mArray = this.currentSelectedArray.filter((m)=> m[this.mDisplay].toLowerCase().indexOf(this.searchFilter.toLowerCase()) > -1);
    } else {
      this.mArray = this.currentSelectedArray;
    }
  }

}
