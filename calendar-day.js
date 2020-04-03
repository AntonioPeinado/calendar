import { BaseElement } from './core/base-element.js';

class XCalendarDay extends BaseElement {
    get date() {
        return new Date(this.dataset.date);
    }
    render() {
        return `<p>${this.date.getDate()}</p>`
    }
}

customElements.define('x-calendar-day', XCalendarDay);