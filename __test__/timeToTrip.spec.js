import { timeToTrip } from "../src/client/js/app"


describe("testing function that calculates time to the trip", () => {
    test("testing the timeToTrip function", () => {
        const date = new Date();
        const newDate = date.setDate(date.getDate() + 10);

        const input = (newDate);
        const output = 10;

        expect(timeToTrip(input).toEqual(output));
    })
} )