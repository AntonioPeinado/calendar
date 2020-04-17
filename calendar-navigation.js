import { BaseElement } from './core/base-element.js';

class XCalendarNavigation extends BaseElement {
    static get styles(){
        return ['/calendar-navigation.css']
    }
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
            <svg class="x-navigation__icon" id="previous" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/>
            </svg>
            <svg class="x-navigation__icon" id="next" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/>
            </svg>
        `
    }
}

customElements.define('x-calendar-navigation', XCalendarNavigation);