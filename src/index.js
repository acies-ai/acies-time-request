import moment from 'moment';

const DATEFORMAT = "YYYY-MM-DD";
const valid_relative_range_components = ["days", "weeks", "months", "years", "quarters"];

const parse = (input) => {

    let output = {};

    if(input.from) output.from = moment(input.from, DATEFORMAT).format(DATEFORMAT);
    if(input.to) output.to = moment(input.to, DATEFORMAT).format(DATEFORMAT);

    if(!output.to) output.to = moment().format(DATEFORMAT);
    
    if(!output.from && !output.from)
    {
        const relative_date_component = Object.keys(input).find(r => valid_relative_range_components.includes(r));
        if(relative_date_component)
        {
            return {
                from: moment().subtract(input[relative_date_component], relative_date_component).format("YYYY-MM-DD"),
                to: moment().format("YYYY-MM-DD"),
            };
        }
    }
    
    return output;
};

export {
    parse,
};