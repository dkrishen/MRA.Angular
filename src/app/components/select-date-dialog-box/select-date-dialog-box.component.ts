import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { FormControl } from '@angular/forms';
import { InputOrderFormDto } from 'src/app/models/InputOrderFormDto';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-select-date-dialog-box',
  templateUrl: './select-date-dialog-box.component.html',
  styleUrls: ['./select-date-dialog-box.component.css']
})
export class SelectDateDialogBoxComponent implements OnInit {

  public title?: string;
  public date?: string;
  public startTime?: string;
  public endTime?: string;

  constructor(public dialogRef: MatDialogRef<SelectDateDialogBoxComponent>) {
  }

  ngOnInit(): void {


    console.log(this.title);
    console.log(this.date);
  }

  onSubmit(date: any, startTime: any, endTime: any){
    var data = new InputOrderFormDto();
    data.date = this.date;
    data.startTime = this.startTime;
    data.endTime = this.endTime;

    this.dialogRef.close(data);
  }

  updateEventDate(type: string, event: MatDatepickerInputEvent<Date>) {
    if(event.value?.getMonth() != undefined) {
      this.date = (event.value?.getMonth()+1) + '/' + (event.value?.getDate()) + '/' + event.value?.getFullYear()
    }
  }
  
  setStartTime(eventValue: string){
    this.startTime = eventValue;
  }
  
  setEndTime(eventValue: string){
    this.endTime = eventValue;
  }
}
