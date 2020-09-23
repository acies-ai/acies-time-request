import should from "should";
import {describe, it} from "mocha";
import {parse, MIN_DATE, MAX_DATE} from "./";
import moment, { months } from "moment";

describe("parse", function ()
{
    it("should handle the null case", () => {

        parse({}).should.eql({ from: MIN_DATE, to: MAX_DATE});
        parse(undefined).should.eql({ from: MIN_DATE, to: MAX_DATE});
        parse(null).should.eql({ from: MIN_DATE, to: MAX_DATE});
        parse("").should.eql({ from: MIN_DATE, to: MAX_DATE});
        parse({
            from: null,
        }).should.eql({ from: MIN_DATE, to: MAX_DATE});
        parse({
            to: null,
        }).should.eql({ from: MIN_DATE, to: MAX_DATE});
        parse({
            from: null,
            to: null,
        }).should.eql({ from: MIN_DATE, to: MAX_DATE});
        parse({
            from: undefined,
            to: undefined,
        }).should.eql({ from: MIN_DATE, to: MAX_DATE});
    });

    it("should parse 2 specific dates", () => {

        const res = parse({
            from: "2020-01-01",
            to: "2020-03-02",
        });

        should.exist(res);

        res.should.eql({
            from: "2020-01-01",
            to: "2020-03-02",
        });
    });

    it("should parse a range without a to", () => {

        const res = parse({
            from: "2020-01-01",
        });

        should.exist(res);

        res.should.eql({
            from: "2020-01-01",
            to: MAX_DATE,
        }); 

    });

    it("should parse a rolling range of 7 days", () => {

        const res = parse({
            days: 7,
        });

        should.exist(res);

        res.should.eql({
            from: moment().subtract(7, "days").format("YYYY-MM-DD"),
            to: MAX_DATE,
        }); 

    });

    it("should parse last week", () => {

        const res = parse({
            weeks: 1,
            last: true,
        });

        should.exist(res);

        res.should.eql({
            from: moment().startOf("week").subtract(7, "days").format("YYYY-MM-DD"),
            to: moment().startOf("week").subtract(1, "days").format("YYYY-MM-DD"),
        }); 

    });

    it("should parse last month", () => {

        const res = parse({
            months: 1,
            last: true,
        });

        should.exist(res);

        res.should.eql({
            from: moment().startOf("month").subtract(1, "month").format("YYYY-MM-DD"),
            to: moment().startOf("month").subtract(1, "days").format("YYYY-MM-DD"),
        });

        moment(res.from, "YYYY-MM-DD").date().should.eql(1);

    });

    it("should parse last month in the singular form", () => {

        const res = parse({
            month: 1,
            last: true,
        });

        should.exist(res);

        res.should.eql({
            from: moment().startOf("month").subtract(1, "month").format("YYYY-MM-DD"),
            to: moment().startOf("month").subtract(1, "days").format("YYYY-MM-DD"),
        });

        moment(res.from, "YYYY-MM-DD").date().should.eql(1);

    });

    it("should return min and max if it exists in options", () => {
        const min = 'min';
        const max = 'max';
        parse({}, { min, max }).should.eql({ from: min, to: max});
    })
    
});
