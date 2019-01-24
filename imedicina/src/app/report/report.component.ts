import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from '../_services';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  calendarOptions: Options;
  displayEvent: any;
  events: any[] = []
 customObj : any;
   @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
   constructor(protected eventService: EventService) { }
 
   ngOnInit() {
     this.eventService.getEvents().subscribe(data => {
       
       this.events = data; 
 
       this.calendarOptions = {
         editable: true,
         eventLimit: false,
         header: {
           left: 'prev,next today',
           center: 'title',
           right: 'month,agendaWeek,agendaDay,listMonth'
         },
         events: data
       };
     });
   }
   clickButton(model: any) {
     this.displayEvent = model;
   }
   eventClick(model: any) {
     model = {
       event: {
         id: model.event.id,
         start: model.event.start,
         end: model.event.end,
         title: model.event.title,
         allDay: model.event.allDay
         // other params
       },
       duration: {}
     }
     this.displayEvent = model;
   }
   updateEvent(model: any) {
     model = {
       event: {
         id: model.event.id,
         start: model.event.start,
         end: model.event.end,
         title: model.event.title
         // other params
       },
       duration: {
         _data: model.duration._data
       }
     }
     this.displayEvent = model;
   }
 
   add(){
 
   }
 
   update(){
 
   }
 
    AddItem() {   
      alert('adicionar');
          let customObj  = {
             title: 'desgraça',
             start: '2019-1-12T12:00:00',
             color:'red',
             status:'baladeira'
           };
 
    this.events.push(customObj);   
 
    console.log(this.events); 
    
  }  
 
  remove(user) {  
      //mandar a id e cadastrar
      
      alert(user.id)
      console.log(this.events); 
 
   this.events.splice(user.id, 1);  
   console.log(this.events); 
 
 } 

}
