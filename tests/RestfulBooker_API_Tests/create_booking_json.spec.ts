/*
 CREATE BOOKING
 Request Type: POST 
 Request Body: STATIC 
*/
import { test, expect } from '@playwright/test';
import fs from 'fs';

const BASE_URL = 'https://restful-booker.herokuapp.com';

test('Create booking with JSON payload', async ({ request }) => {

    //Read data from JSON
    const jsonPath = 'tests/testdata/booking_request_payload.json';
    const requestPayload = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    const response = await request.post(`${BASE_URL}/booking`, { data: requestPayload });
    const responseBody = await response.json();
    console.log(responseBody);

    //validate status code/response
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');

    //validating response body
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
    expect(responseBody.bookingid).toEqual(expect.any(Number)); //Asymetric matchers

    //validate booking fields
    expect(responseBody.booking).toMatchObject(
        {
            "firstname": requestPayload.firstname,
            "lastname": requestPayload.lastname,
            "totalprice": requestPayload.totalprice,
            "depositpaid": requestPayload.depositpaid,
            "additionalneeds": requestPayload.additionalneeds
        }
    );

    //Validate booking dates
    expect(responseBody.booking.bookingdates).toMatchObject({
        "checkin": requestPayload.bookingdates.checkin,
        "checkout": requestPayload.bookingdates.checkout
    });
})