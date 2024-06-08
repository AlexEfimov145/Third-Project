import moment from 'moment';

function formatDate(date: Date | undefined): string {
    return date ? moment(date).format('DD.MM.YYYY') : '';
}

export default formatDate;