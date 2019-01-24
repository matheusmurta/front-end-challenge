import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';


@Injectable()
export class EventService {
    public getEvents(): Observable<any> {
        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
        let data: any = [
        {
            id: 1,
            title: 'Unha encravada seu claudio',
            start: '2019-01-01T01:00:00.000Z',
            end:'2019-01-01T02:12:12.000Z',
            status:'free',
            color:'#c5eff7',
        },
        {
            id: 2,
            title: 'Morroida',
            start: '2019-01-01T03:00:00.000Z',
            end:'2019-01-01T04:12:12.000Z',
            status:'busy',
            color:'#d91e18',
        },
        {
            id: 3,
            title: 'Dor na bunda',
            start: '2019-01-01T05:00:00.000Z',
            end:'2019-01-01T06:12:12.000Z',
            status:'progress',
            color:'#ffff7e',
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: yearMonth + '-16T16:00:00'
        },
        {
            title: 'Conference',
            start: yearMonth + '-11',
            end: yearMonth + '-13'
        },
        {
            title: 'Meeting',
            start: yearMonth + '-12T10:30:00',
            end: yearMonth + '-12T12:30:00'
        },
        {
            title: 'Lunch',
            start: yearMonth + '-12T12:00:00'
        },
        {
            title: 'Meeting',
            start: yearMonth + '-12T14:30:00'
        },
        {
            title: 'Happy Hour',
            start: yearMonth + '-12T17:30:00'
        },
        {
            title: 'Dinner',
            start: yearMonth + '-12T20:00:00'
        },
        {
            title: 'Birthday Party',
            start: yearMonth + '-13T07:00:00'
        },
        {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: yearMonth + '-28'
        }];
        return of(data);
    }
};
