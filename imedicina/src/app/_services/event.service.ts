import { Injectable } from '@angular/core';

let events = [
    {
        id: 1,
        title: 'Consulta Ana',
        start: '2019-01-28T02:30:00',
        end: '2019-01-28T03:30:00',
        status: 'FREE',
        color: '#6bb9f0',
    },
    {
        id: 2,
        title: 'Consulta Caio',
        start: '2019-01-29T05:10:00',
        end: '2019-01-29T06:40:00',
        status: 'BUSY',
        color: '#e74c3c',
    },
    {
        id: 3,
        title: 'Consulta Pedro',
        start: '2019-01-27T04:00:00.000Z',
        end: '2019-01-27T05:12:12.000Z',
        status: 'DONE',
        color: '#3fc380',
    },
    {
        id: 4,
        title: 'Consulta Maria',
        start: '2019-01-30T15:00:00.000Z',
        end: '2019-01-30T16:30:12.000Z',
        status: 'PROGRESS',
        color: '#fef160',
    },
    {
        id: 8,
        title: 'Consulta Edu',
        start: '2019-01-28T18:00:00.000Z',
        end: '2019-01-28T19:50:12.000Z',
        status: 'FREE',
        color: '#6bb9f0 ',
    }
];

@Injectable()
export class EventService {

    constructor() { }

    get() {
        return new Promise(resolve => {
            resolve(events);
        });
    }

    getEvent(id) {
        return new Promise(resolve => {
            const result = events.filter(x => x.id === id);
            resolve(result);
        });
    }

    timeValidator(event){
        //valida se ja existe no array algum evento marcao neste horario
        return new Promise(resolve => {
            const result = events.map(x => x.start === event.start || x.start === event.end || x.end === event.start || x.end == event.end);
            const resultTeste = result.filter(x => x == true);
            if(resultTeste.length > 0){
                resolve(true);
            } else {
                resolve(false);
            }
        });
    
      }

    add(data) {
        return new Promise(resolve => {
            events.push(data);
            resolve(data);
        });
    }

    put(changed) {
        return new Promise(resolve => {
            const index = events.findIndex(event => event.id === changed.id);
            events[index].title = changed.title;
            events[index].start = changed.start;
            events[index].end = changed.end;
            events[index].status = changed.status;
            events[index].color = changed.color;
            resolve(changed);
        });
    }

    delete(id) {
        return new Promise(resolve => {
            events = events.filter(function (obj) {
                return obj.id !== id;
            });
            resolve(id);
        });
    }

};


