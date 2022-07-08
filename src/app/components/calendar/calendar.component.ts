import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg, EventInput, EventSourceInput, FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { DateClickArg } from '@fullcalendar/interaction';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material/dialog'
import { SelectDateDialogBoxComponent } from '../select-date-dialog-box/select-date-dialog-box.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  orders: Order[] = []
  events: EventInput[] = []

  currentUsername: string | null = '';

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private userService: UserService) { 
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
    })
  }

  resetPage(){

  }

  updateName(){
    this.userService.getUserInfo()
    .subscribe(
      (data) => (this.currentUsername = data.name),
      (error) => {
        this.currentUsername = ''
        console.log(error)
      }
    )
  }

  ngOnInit(): void {
    this.updateName()
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
      data: {'title':'create order'}
    });
    dialogRef.componentInstance.title = "Create order"
    dialogRef.componentInstance.date = (arg.date.getMonth()+1)+'/'+arg.date.getDate()+'/'+arg.date.getFullYear()
    dialogRef.componentInstance.isOwner = true;
    dialogRef.componentInstance.createMode = true;
    dialogRef.componentInstance.orders = this.orders;

    // dialogRef.componentInstance.startTime = "12:30";
    // dialogRef.componentInstance.endTime = "12:45";


    dialogRef.afterClosed()
    .subscribe(data => {

      if(data != undefined){

        
        console.log('RETURNED VALUE' + data.date + ' ' + data.startTime + ' ' + data.endTime);

        this.orderService.postOrder(data).subscribe(() => {
          console.log("yhoo")
          this.resetPage()
        });
      }
    });
  }
  
  handleEventClick(arg: EventClickArg) {
    console.log(arg)

    var startTime = arg.event._def.title.slice(0, 5)
    var endTime = arg.event._def.title.slice(6, 11)
    var username = arg.event._def.title.slice(12, arg.event._def.title.length)

    console.log(arg.event._context.calendarApi.getCurrentData().currentDate)
    console.log(arg.event._def.title)
    console.log(startTime)
    console.log(endTime)
    console.log(username)

    // alert('event click! ' + arg.view.title)

    var order = this.orders.find(o => {
      if(o.username == username && o.startTime == startTime && o.endTime == endTime) return true
      else return false
    })

    console.log(order)
    console.log(this.orders)

    if(order != undefined){
      var date = new Date(order.date)

      let dialogRef = this.dialog.open(SelectDateDialogBoxComponent,{
        width: '250px',
        data: {'title':(order?.username == this.currentUsername ? 'edit order' : 'order info')}
      });
      dialogRef.componentInstance.title = (order?.username == this.currentUsername ? 'edit order' : 'order info')
      dialogRef.componentInstance.date = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear()
      dialogRef.componentInstance.startTime = startTime;
      dialogRef.componentInstance.endTime = endTime;
      dialogRef.componentInstance.isOwner = (order?.username == this.currentUsername ? true : false)
      dialogRef.componentInstance.createMode = false;
      dialogRef.componentInstance.orders = this.orders;

      // order.startTime = "";

      dialogRef.afterClosed()
      .subscribe(data => {
        // console.log('RETURNED VALUE' + data.date + ' ' + data.startTime + ' ' + data.endTime);
        console.log(data);
        if(data != undefined){

          if(data){
            console.log("TRUE")
            console.log(order)
            
            if(order != undefined){
              order.startTime = data.startTime;
              order.endTime = data.endTime;
              order.date = data.date;
              var tmp = order.id.toString();
              
              
              this.orderService.updateOrder(order).subscribe(() => {
                console.log("updated")
                
              });
            
            }
          }
          else {
            if(order != undefined){
              this.orderService.deleteOrder(order.id).subscribe(() => {
                console.log("deleted")
                
              });
            }
          }
        }
      }); 
    }
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
