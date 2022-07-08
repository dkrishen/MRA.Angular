import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { InputOrderFormDto } from 'src/app/models/InputOrderFormDto';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Order } from 'src/app/models/order';

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
  public isOwner?: boolean;
  public createMode?: boolean;
  public orders?: Order[];

  constructor(public dialogRef: MatDialogRef<SelectDateDialogBoxComponent>) { }

  ngOnInit(): void { }

  onSubmit(date: any, startTime: any, endTime: any){
    var data = new InputOrderFormDto();

    data.date = this.date;
    data.startTime = this.startTime;
    data.endTime = this.endTime;

    if(this.validateTime(data)){
      this.dialogRef.close(data);
    }
  }

  onRemuve(){
    this.dialogRef.close(false);
  }

  updateEventDate(type: string, event: MatDatepickerInputEvent<Date>) {
    if(event.value?.getMonth() != undefined) {
      this.date = (event.value?.getMonth()+1) + '/' + (event.value?.getDate()) + '/' + event.value?.getFullYear()
    }
  }
  
  updateStartTime(){
    console.log("UPDATE")
  }
  
  setStartTime(eventValue: string){
    this.startTime = eventValue;
  }
  
  setEndTime(eventValue: string){
    this.endTime = eventValue;
  } 
  
  validateTime(data: InputOrderFormDto){
    if(data.startTime == undefined || data.endTime == undefined || data.date == undefined){
      alert("fields must be filled")
      return false
    }
    if(data.startTime >= data.endTime){
      alert("start time must be more than end time")
      return false;
    }

    var orderDate = new Date(data.date);
    var dayOrders = this.orders?.filter(order => {
      var date = new Date(order.date)
      if(date.toString()==orderDate.toString()){
        return true
      }
      else {
        return false;
      }
    });

    var collision = dayOrders?.filter(order => {
        if(data.startTime != undefined && data.endTime != undefined){
          if((data.startTime > order.startTime && data.startTime < order.endTime)||
          (data.endTime > order.startTime && data.endTime < order.endTime) ||
          (order.startTime > data.startTime && order.startTime < data.endTime)){
            return true;
          }
          else return false;
        }
        else return false;
      })

      if(collision?.length != 0){
        alert("time collision found")
        console.log(collision)
        return false
      }
      
    return true;
  }
}