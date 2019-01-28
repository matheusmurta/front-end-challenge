import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({templateUrl: 'home.component.html',  styleUrls: ['./home.component.scss']})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    showCalendar = true;
    showReport = false;

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    
    Calendar(){
        this.showCalendar = true;
        this.showReport = false;
    }

    Report(){
        this.showCalendar = false;
        this.showReport = true;
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }
}