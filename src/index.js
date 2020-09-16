import moment from 'moment';

const DATEFORMAT = "YYYY-MM-DD";

const parse = (input) => {

    let output = {};

    if(input.from) output.from = moment(input.from, DATEFORMAT).format(DATEFORMAT);
    if(input.to) output.to = moment(input.to, DATEFORMAT).format(DATEFORMAT);

    if(!input.to) output.to = moment().format(DATEFORMAT);    
    
    return output;
};

export {
    parse,
};