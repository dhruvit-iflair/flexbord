import { Directive ,HostListener,OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Directive({
    selector: '[Back]',
})
export class BackLocationDirective implements OnInit{
    
    constructor(private location: Location){}
    ngOnInit(){}
    @HostListener('click', ['$event']) clickEvent(event) { this.location.back(); }
 }