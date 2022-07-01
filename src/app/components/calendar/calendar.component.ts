import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg, EventInput, EventSourceInput } from '@fullcalendar/angular';
import { DateClickArg } from '@fullcalendar/interaction';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material/dialog'
import { SelectDateDialogBoxComponent } from '../select-date-dialog-box/select-date-dialog-box.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  orders: Order[] = []
  events: EventInput[] = []

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef) { 
    this.createCalendar();
  }

  createCalendar(){
    this.orderService.getAllOrders()
    .subscribe(result => {
      this.orders = result
      console.log(this.orders);
      this.setEvents();
      
      this.calendarOptions.events = this.events;  
      console.log('updateeeeeeee')
      this.changeDetector.detectChanges();
    })
  }

  ngOnInit(): void {

  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    firstDay: 1,
    dateClick: this.handleDateClick.bind(this), // bind is important!
    eventClick: this.handleEventClick.bind(this), 
  };

  handleDateClick(arg: DateClickArg) {
    let dialogRef = this.dialog.open(SelectDateDialogBoxComponent,{
      width: '250px',
      data: {'title':'create event'}
    });
    dialogRef.componentInstance.title = "event"
    dialogRef.componentInstance.date = (arg.date.getMonth()+1)+'/'+arg.date.getDate()+'/'+arg.date.getFullYear()
    dialogRef.componentInstance.startTime = "12:30";
    dialogRef.componentInstance.endTime = "12:45";


    dialogRef.afterClosed()
    .subscribe(data => {
      console.log('RETURNED VALUE' + data.date + ' ' + data.startTime + ' ' + data.endTime);

      this.orderService.postOrder(data).subscribe(() => {
        console.log("yhoo")
        this.createCalendar()
      });
    });




  }
  handleEventClick(arg: EventClickArg) {
    alert('event click! ' + arg.view.title)
  }

  setEvents(){
    
    this.orders.forEach(order => {
      var date = new Date(order.date)

      var event = {
        title: order.startTime+'-'+order.endTime + ' ' + order.username,
        date: date.getFullYear()+'-'
          + ((date.getMonth()+1).toString().length == 1 ? '0' + (date.getMonth()+1) : date.getMonth()+1) +'-'
          + ((date.getDate()).toString().length == 1 ? '0' + (date.getDate()) : date.getDate())
      }
      this.events.push(event);
    });

    console.log('result: ' + this.events)
  }
}
