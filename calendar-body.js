import { BaseElement } from './core/base-element.js';
import { dateService } from './date-service.js';
import './calendar-summary.js';
import './calendar-navigation.js';
import './calendar-month.js';

class XCalendarBody extends BaseElement {
    static get styles(){
        return ['/calendar-body.css']
    }
    constructor() {
        super();
        this._selectedDate = new Date(dateService.date);
    }
    connectedCallback() {
        super.connectedCallback();
        dateService.on(dateService.MONTH_CHANGED, this._onMonthChanged);
        this.$.navigation.addEventListener('change', this._onNavigation);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        dateService.off(dateService.MONTH_CHANGED, this._onMonthChanged);
        this.$.navigation.removeEventListener('change', this._onNavigation);
    }
    _onMonthChanged = (date) => {
        this._selectedDate = date;
        this._updateSummary();
        this._updateMonth();
    }
    _onNavigation = (ev) => {
        ev.stopPropagation();
        const change = ev.detail;
        this._selectedDate.setMonth(this._selectedDate.getMonth() + change);
        this._updateSummary();
        this._updateMonth();
    }
    _updateSummary() {
        this.$.summary.update(this._selectedDate);
    }
    _updateMonth() {
        this.$.month.update(this._selectedDate);
    }
    render() {
        return `
            <div class="x-body__top">
                <x-calendar-summary id="summary" data-date="${this._selectedDate}"></x-calendar-summary>
                <x-calendar-navigation id="navigation"></x-calendar-navigation>
            </div>
            <x-calendar-month id="month" data-date="${this._selectedDate}"></x-calendar-month>
        `;
    }
}
customElements.define('x-calendar-body', XCalendarBody);