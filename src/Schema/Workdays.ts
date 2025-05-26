import { Days } from 'src/MockDatabase/Enums/doctors';

const DaysList = [Days?.monday, Days?.tuesday, Days?.wednesday, Days?.thursday, Days?.friday, Days?.saturday, Days?.sunday];

export const getWorkdaysFormat = (workdays: Array<Days>): string => {
    let formatted = '';
    let prevWorkDay = '';
    let count = 0;
    if(workdays?.includes(Days?.monday)){
        formatted = 'Mon';
        count = 1;
    }
    DaysList.forEach(day => {
       if(workdays?.includes(day)){
           if(day !== Days?.monday){
             if(count === 0){
                if(formatted?.length > 0){
                    formatted += ', ';
                }
                formatted += day?.slice(0, 3);
            }
            prevWorkDay = day?.slice(0, 3);
            count++;
           }
       }else{
            if(count > 1){
                formatted += '-' + prevWorkDay;
                prevWorkDay = '';
            }
            count = 0;
       }
    });
    if(prevWorkDay?.length > 0 && count > 1){
        formatted += '-' + prevWorkDay;
    }
    return formatted;
};
