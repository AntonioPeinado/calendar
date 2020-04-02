import { BaseElement } from './core/base-element.js';
import { dateService } from './date-service.js';
import './calendar-header.js';
import './calendar-body.js';

class XCalendar extends BaseElement {
    connectedCallback(){
        super.connectedCallback();
        dateService.start();
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        dateService.stop();
    }
    render() {
        return `
            <x-calendar-header></x-calendar-header>
            <x-calendar-body></x-calendar-body>
        `;
    }
}
customElements.define('x-calendar', XCalendar);