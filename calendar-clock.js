import { BaseElement } from './core/base-element.js';
import { dateService } from './date-service.js';
import { DateFormatter } from './date-formatter.js';

class XCalendarClock extends BaseElement {
    static get styles(){
        return [
            '/calendar-clock.css'
        ];
    }
    get $text() {
        if (!this._$text) {
            this._$text = this.shadowRoot.getElementById('text');
        }
        return this._$text;
    }
    get timeString() {
        return DateFormatter.timeString(dateService.date);
    }
    connectedCallback() {
        super.connectedCallback();
        dateService.on(dateService.SECOND_CHANGED, this._onSecondChanged);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        dateService.off(dateService.SECOND_CHANGED, this._onSecondChanged);
    }
    _onSecondChanged = () => {
        this.$text.textContent = this.timeString;
    }
    render() {
        return `
            <p class="x-clock" id="text">${this.timeString}</p>
        `;
    }
}
customElements.define('x-calendar-clock', XCalendarClock);