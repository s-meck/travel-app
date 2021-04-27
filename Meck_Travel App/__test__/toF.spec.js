import { toF } from "../src/server/app.js"

describe ('check if the function accurately converts Celsius to Fahrenheit', () => {
    test ('convert temperature', () => {
        const fahrenheit = 75;
        const celsius = 24;

        expect (toF(celsius)).toEqual(fahrenheit);
    });
});