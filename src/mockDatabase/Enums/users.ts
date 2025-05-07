
export enum UserGender {
    MALE = 'male',
    FEMALE = 'female',
}
export enum DoctorSpecialists {
    CARDIOLOGY = 'cardiology',
    DERMATOLOGY = 'dermatology',
}
export enum UserRole {
    DOCTOR = 'doctor',
    PATIENT = 'patient',
    ADMIN = 'admin',
}

export enum Days{
    MONDAY = 'monday',
    TUESDAY = 'tuesday',
    WEDNESDAY = 'wednesday',
    THURSDAY = 'thursday',
    FRIDAY = 'friday',
    SATURDAY = 'saturday',
    SUNDAY = 'sunday'
}
export const DaysList: Days[] = [
    Days?.MONDAY,
    Days?.TUESDAY,
    Days?.WEDNESDAY,
    Days?.THURSDAY,
    Days?.FRIDAY,
    Days?.SATURDAY,
    Days?.SUNDAY,
];
