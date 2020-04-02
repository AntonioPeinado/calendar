import { EventEmitter } from './core/event-emitter.js';
import { config } from './config.js';

class DateService extends EventEmitter {
    constructor() {
        super();
        this._date = new Date();
    }
    get SECOND_CHANGED() {
        return 'second-changed';
    }
    get DAY_CHANGED() {
        return 'day-changed';
    }
    get MONTH_CHANGED() {
        return 'month-changed';
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
        const oldDate = this._date;
        this._date = new Date();
        if (oldDate.getMonth() !== this._date.getMonth()) {
            this.emit(this.MONTH_CHANGED, this._date);
        }
        if(oldDate.getDate() !== this._date.getDate()){
            this.emit(this.DAY_CHANGED, this._date);
        }
        this.emit(this.SECOND_CHANGED, this._date);
    }
}
export const dateService = new DateService();