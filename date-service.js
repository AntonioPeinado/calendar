import { EventEmitter } from './core/event-emitter.js';
import {config} from './config.js';

class DateService extends EventEmitter {
    constructor() {
        super();
        this._date = new Date();
    }
    get SECOND_CHANGED() {
        return 'second-changed';
    }
    get DAY_CHANGED(){
        return 'day-changed';
    }
    get date() {
        return this._date;
    }
    start() {
        this._updateDate();
        this._interval = window.setInterval(
            this._updateDate.bind(this),
            config.refreshInterval
        );
    }
    stop() {
        window.clearInterval(this._interval);
    }
    _updateDate() {
        const newDate = new Date();
        // comparar this._date con newDate
        // TODO: comprobar si cambio de dia y en ese
        // caso emitir el evento day-changed
        this._date = newDate;
        this.emit(this.SECOND_CHANGED, this._date);
    }
}
export const dateService = new DateService();
// TODO: quitar napa
window.dateService = dateService;