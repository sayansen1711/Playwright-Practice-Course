/*
 CREATE BOOKING
 Request Type: POST 
 Request Body: STATIC 
*/
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

test('Create booking with static payload', async ({ request }) => {
    const requestPayload = {
        "firstname": "John",
        "lastname": "Cena 2",
        "totalprice": 100,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-09-09",
            "checkout": "2026-09-15"
        },
        "additionalneeds": "Breakfast"
    };

    const response = await request.post(`${BASE_URL}/booking`, { data: requestPayload });
    const responseBody= await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');

    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
    expect(responseBody.bookingid).toEqual(expect.any(Number)); //Asymetric matchers

    expect(responseBody.booking).toMatchObject(requestPayload);
    //Validate booking dates

    expect(responseBody.booking.bookingdates).toMatchObject({
        "checkin": "2018-09-09",
        "checkout": "2026-09-15"
    });
})