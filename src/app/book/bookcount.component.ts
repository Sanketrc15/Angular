import { Component, Input, Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bookcount',
  templateUrl: './bookcount.component.html',
  styleUrls: ['./bookcount.component.css']
})


export class BookCountComponent{

    selectedRadioButtonValue : string ="All";
    
    @Output()
    countRadioButtonSelectionChanges : EventEmitter<String> = new EventEmitter<String>();

    @Input()
    all: number;

    @Input()
    computer_Programming : number ;

    @Input()
    novel: number;

    onRadioButtonSelectionChanged() : void {
        this.countRadioButtonSelectionChanges.emit(this.selectedRadioButtonValue);
    }
}