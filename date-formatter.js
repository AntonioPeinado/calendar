class DateFormatter {
    static timeString(date) {
        const hours = this._twoDigits(date.getHours());
        const minutes = this._twoDigits(date.getMinutes());
        const seconds = this._twoDigits(date.getSeconds());
        return `${hours}:${minutes}:${seconds}`;
    }
    static dateString(date) {
        // TODO: implimentar este metodo
        // miercoles, 1 de abril de 2020
        return date;
    }
    static monthString(date){

    }
    static _twoDigits(value) {
        if (value < 10) {
            return `0${value}`;
        }
        return value;
    }
}

export { DateFormatter };