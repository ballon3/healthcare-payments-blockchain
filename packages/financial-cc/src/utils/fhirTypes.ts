/**
 * Format date to `YYYY-MM-DD` as FHIR standard
 * https://www.hl7.org/fhir/datatypes.html#date
 * @param date Initial date
 */
export function date(date: Date | string) {
    if (!date) {
        throw new Error(`Tried to format date of undefined or null`);
    }
    if (typeof date === 'string') {
        date = new Date(date);
    }
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
}

export const dateRegex = new RegExp(`([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?`);