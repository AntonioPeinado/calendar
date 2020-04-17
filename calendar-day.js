import { BaseElement } from './core/base-element.js';

class XCalendarDay extends BaseElement {
    get date() {
        return new Date(this.dataset.date);
    }
    render() {
        return `<div>${this.date.getDate()}</div>`
    }
}

customElements.define('x-calendar-day', XCalendarDay);