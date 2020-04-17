import { BaseElement } from './core/base-element.js';
import { dateService } from './date-service.js';
import './calendar-header.js';
import './calendar-body.js';

class XCalendar extends BaseElement {
    static get styles() {
        return [
            '/styles/layout.css',
            '/calendar.css'
        ];
    }
    connectedCallback() {
        super.connectedCallback();
        dateService.start();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        dateService.stop();
    }
    render() {
        return `
            <x-calendar-header class="x-calendar__header"></x-calendar-header>
            <x-calendar-body class="x-calendar__body"></x-calendar-body>
        `;
    }
}
customElements.define('x-calendar', XCalendar);