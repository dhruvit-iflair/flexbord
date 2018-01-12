import {OnInit,Input, Directive, ElementRef, EventEmitter, Output } from "@angular/core";
import {NgModel} from '@angular/forms';

declare var jQuery:any;

@Directive({
    selector: '[select2]', 
    // providers: [NgModel],
    // host: {
    //   '(select)' : 'onInputChange()'
    // }
})

export class Dir_select implements OnInit{
    @Input('placeholder') placeholder: string;
    @Input('selectedValves') selectedValves: string;
    @Input('options') opt: any;
    @Output() setData = new EventEmitter(); 
    constructor(public el:ElementRef) {
     }
    ngOnInit() {
        var self = this;
        var ca = self.el.nativeElement.className.split(' ');
            jQuery("."+ca[0]).select2({
              placeholder: this.placeholder,          
              allowClear: true
            });
            jQuery("."+ca[0]).on("select2:select", function(e) { 
                self.onInputChange();
            });
            if (this.selectedValves) {
                // //console.log(this.opt);
                setTimeout(()=>{
                    var vv = this.selectedValves.split(',');
                    // //console.log(vv);
                    jQuery("."+ca[0]).val(vv).trigger('change');
                },100);                
            }
    }
    onInputChange(){
        var self = this;
        var ca = self.el.nativeElement.className.split(' ');
        this.setData.emit(jQuery("."+ca[0]).val());
    }
}