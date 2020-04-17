import { BaseElement } from './core/base-element.js';
import { MonthHelper } from './month-helper.js';
import { config } from './config.js';
import { dateService } from './date-service.js'
import { WEEKDAY_LETTERS } from './date-constants.js';

import './calendar-day.js';

const DAYS_PER_WEEK = 7;

class XCalendarMonth extends BaseElement {
    static get styles(){
        return ['/calendar-month.css']
    }
    get date(){
        return new Date(this.dataset.date);
    }
    get days() {
        return MonthHelper.getDays(this.date, config.startDay, DAYS_PER_WEEK * config.monthRows);
    }
    connectedCallback(){
        super.connectedCallback();
        this.addEventListener('click', this._onClick);
        dateService.on(dateService.DAY_CHANGED, this._onDayChanged);
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        this.removeEventListener('click', this._onClick);
        dateService.off(dateService.DAY_CHANGED, this._onDayChanged);
    }
    update(date) {
        this.setAttribute('data-date', date);
        this.shadowRoot.innerHTML = this.render();
    }
    _onDayChanged = (date) => {
        this.shadowRoot.querySelector('[data-today]').removeAttribute('data-today');
        this.shadowRoot.querySelector(`[data-date="${date.toDateString()}"`).setAttribute('data-today', '');
    }
    _onClick = (ev) => {
        const newSelectedDay = this._findCalendarDay(ev.path);
        if(!newSelectedDay){
            return;
        }
        this._selectedDay && this._selectedDay.removeAttribute('data-selected');
        this._selectedDay = newSelectedDay;
        this._selectedDay.setAttribute('data-selected', '');
    }
    _findCalendarDay(path){
        return path.find((el) => el.localName === 'x-calendar-day');
    }
    _getWeekDays() {
        const days = [];
        for(let delante = config.startDay; delante < WEEKDAY_LETTERS.length; delante++ ){
            days.push(WEEKDAY_LETTERS[delante]);
        }
        for (let detras = 0; detras < config.startDay; detras++){
            days.push(WEEKDAY_LETTERS[detras])
        }
        return days;
    }
    _renderDay(day){
        const attrs = [];
        if (dateService.isToday(day)) {
            attrs.push('data-today');
        }
        if (day.getMonth() !== this.date.getMonth()) {
            attrs.push('data-outside');
        }
        return `<x-calendar-day class="x-month__item" ${attrs.join(' ')} data-date="${day.toDateString()}"></x-calendar-day>`
    }
    _renderDays() {
        return this.days.map((day) => this._renderDay(day)).join('')
    }
    _renderWeekdays(){
        return this._getWeekDays().map((wd)=> `<div class="x-month__item">${wd}</div>`).join('');
    }
    render() {
        return `
            ${this._renderWeekdays()}
            ${this._renderDays()}
        `

    }
}

customElements.define('x-calendar-month', XCalendarMonth);