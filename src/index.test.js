import should from "should";
import {describe, it} from "mocha";
import {parse} from "./";
import moment from "moment";

describe("Basic tests", function ()
{
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
            to: moment().format("YYYY-MM-DD"),
        }); 

    });

    it("should parse a rolling range of 7 days", () => {

        const res = parse({
            days: 7,
        });

        should.exist(res);

        res.should.eql({
            from: moment().subtract(7, "days").format("YYYY-MM-DD"),
            to: moment().format("YYYY-MM-DD"),
        }); 

    });
    
});