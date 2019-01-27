import { Component, OnInit } from '@angular/core';
import { EventService } from '../_services';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EventFormComponent } from '../event/event-form/event-form.component';
import { EventRemoveComponent } from '../event/event-remove/event-remove.component';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [EventService]
})
export class ReportComponent implements OnInit {

  public events;
  public newEvent;
  public event: any = {};
  public displayEvent: any = {}

  constructor(protected eventService: EventService,private modalService: NgbModal) { }
 
   ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    alert('peguei os eventos')
    this.eventService.get().then(dataSource => {
      this.events = dataSource
    });
  }

  delete(status, id){
    if (status == 'PROGRESS' || status == 'DONE') {
      alert('Este evento não pode ser excluido')
    }
    else{
      
      const modalRef = this.modalService.open(EventRemoveComponent);
      modalRef.componentInstance.id = id;
      
      modalRef.result.then((result) => {
        `Closed with: ${result}`;
        return this.getEvents();
      }, (reason) => {
        `Dismissed ${this.getDismissReason(reason)}`;
      });
      
    }

 
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  destroyEvent(id) {
    
  }
}
