import moment from 'moment';

class DateHelper {
    static getAgeStringFromDateOfBirth(dateOfBirth) {
        let months = moment().diff(dateOfBirth, "months");
        if(parseInt(months) < 12) {
            return months + " Months";
        }

        let years = moment().diff(dateOfBirth, "years");
        if (parseInt(years) > 1) {
            return years + " Years";
        } else {
            return years + " Year";
        }
    }
}

export default DateHelper;