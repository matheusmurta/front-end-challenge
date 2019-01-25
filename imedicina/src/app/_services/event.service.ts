import { Injectable } from '@angular/core';

let events = [
    {
        id: 1,
        title: 'Consulta1',
        start: '2019-01-01T01:00:00.000Z',
        end: '2019-01-01T02:12:12.000Z',
        status: 'free',
        color: '#c5eff7',
    },
    {
        id: 2,
        title: 'Consulta2',
        start: '2019-01-03T03:00:00.000Z',
        end: '2019-01-03T04:12:12.000Z',
        status: 'busy',
        color: '#d91e18',
    },
    {
        id: 3,
        title: 'Consulta3',
        start: '2019-01-02T07:12:00.000Z',
        end: '2019-01-02T06:22:12.000Z',
        status: 'progress',
        color: '#ffff7e',
    },
    {
        id: 4,
        title: 'Consulta4',
        start: '2019-01-05T22:00:00.000Z',
        end: '2019-01-05T06:23:12.000Z',
        status: 'progress',
        color: '#ffff7e',
    },
    {
        id: 8,
        title: 'Consulta444',
        start: '2019-01-06T18:00:00.000Z',
        end: '2019-01-01T06:19:12.000Z',
        status: 'progress',
        color: '#ffff7e',
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


