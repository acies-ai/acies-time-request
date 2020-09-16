import moment from 'moment';

const DATEFORMAT = "YYYY-MM-DD";
const valid_relative_range_components = ["days", "weeks", "months", "years", "quarters"];
const MAX_DATE = "MAX_DATE";
const MIN_DATE = "MIN_DATE";

const parse = (input) => {

    let output = {
        from: MIN_DATE,
        to: MAX_DATE,
    };

    if(!input || typeof input !== "object") return output;

    if(input.from) output.from = moment(input.from, DATEFORMAT).format(DATEFORMAT);
    if(input.to) output.to = moment(input.to, DATEFORMAT).format(DATEFORMAT);
    if(!input.from && !input.from)
    {
        const relative_date_component = Object.keys(input).find(r => valid_relative_range_components.includes(r));
        if(relative_date_component)
        {
            output.from = moment().subtract(input[relative_date_component], relative_date_component).format("YYYY-MM-DD");
        }
    }
    
    return output;
};

export {
    parse,
    MIN_DATE,
    MAX_DATE,
};