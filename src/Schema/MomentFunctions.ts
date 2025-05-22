import moment from 'moment';

 export const getTime = (time: Date): string => {
        const momentTime = moment(time);
        return (momentTime.format('HH:MM A')).toString();
    };
