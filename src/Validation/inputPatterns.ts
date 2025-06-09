
interface InputPatternProps{
    type: inputTypes,
}
export enum inputTypes {
    NAME = 'name',
    PASSWORD = 'password',
    EMAIL = 'email',
}

export const inputPatterns = ({type}: InputPatternProps)=>{
    switch(type){
        case inputTypes?.NAME:
            return /[a-zA-Z]+/;
        case inputTypes?.EMAIL:
            return /[a-zA-Z0-9-_.]+@[a-zA-Z]+\.([a-zA-Z]{2})/;
        case inputTypes?.PASSWORD:
            return /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[-_.+$@#*])+/;
        default:
            return /[a-z]+/;
    }
};

