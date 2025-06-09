import moment from 'moment';

 export const getTime = (time: Date): string => {
        const momentTime = moment(time);
        return (momentTime.format('hh:mm A')).toString();
    };
