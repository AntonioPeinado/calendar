import { BaseElement } from './core/base-element.js';

class XCalendarNavigation extends BaseElement {
    connectedCallback() {
        super.connectedCallback();
        this.$.next.addEventListener('click', this._onNextClick);
        this.$.previous.addEventListener('click', this._onPreviousClick);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.$.next.removeEventListener('click', this._onNextClick);
        this.$.previous.removeEventListener('click', this._onPreviousClick);
    }
    _onNextClick = () => {
        this._notify(1);
    }
    _onPreviousClick = () => {
        this._notify(-1);
    }
    _notify(change) {
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: change
        }));
    }
    render() {
        return `
            <button id="next">Siguiente</button>
            <button id="previous">Anterior</button>
        `
    }
}

customElements.define('x-calendar-navigation', XCalendarNavigation);