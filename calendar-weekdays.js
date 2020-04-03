import { BaseElement } from './core/base-element.js';
import { WEEKDAY_LETTERS } from './date-constants.js';
import { config } from './config.js';
class XCalendarWeekdays extends BaseElement {
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
    render() {
        return `
            <p>${this._getWeekDays().join(' ')}</p>
        `;
    }
}
customElements.define('x-calendar-weekdays', XCalendarWeekdays);