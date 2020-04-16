import { BaseElement } from './core/base-element.js';
import { MonthHelper } from './month-helper.js';
import { config } from './config.js';
import { dateService } from './date-service.js'
import './calendar-day.js';

const DAYS_PER_WEEK = 7;

class XCalendarMonth extends BaseElement {
    static get styles(){
        return ['/styles/layout.css']
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
    _renderDay(day){
        const attrs = [];
        if (dateService.isToday(day)) {
            attrs.push('data-today');
        }
        if (day.getMonth() !== this.date.getMonth()) {
            attrs.push('data-outside');
        }
        return `<x-calendar-day ${attrs.join(' ')} data-date="${day.toDateString()}"></x-calendar-day>`
    }
    _renderDays() {
        return this.days.map((day) => this._renderDay(day)).join('')
    }
    render() {
        return `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: 50px 50px 50px 50px 50px 50px 50px;
                }
                x-calendar-day[data-today] {
                    background-color: blue;
                    color: white;
                }
                x-calendar-day[data-outside] {
                    background-color: lightgrey;
                }
                x-calendar-day[data-selected] {
                    border: 1px solid blue;
                }
            </style>
            ${this._renderDays()}
        `

    }
}

customElements.define('x-calendar-month', XCalendarMonth);