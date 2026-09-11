import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

const BASE_URL = 'https://restful-booker.herokuapp.com';

test('Create booking request using Faker library data', async ({ request }) => {

    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const totalprice = faker.number.int({ min: 100, max: 500 });
    const depositpaid = faker.datatype.boolean();

    const checkindate = DateTime.now().toFormat("yyyy-MM-dd");
    const checkoutdate = DateTime.now().plus({ day: 3 }).toFormat("yyyy-MM-dd");

    const additionalneeds = 'super bowls';

    const requestPayload = {
        "firstname": firstname,
        "lastname": lastname,
        "totalprice": totalprice,
        "depositpaid": depositpaid,
        "bookingdates": {
            "checkin": checkindate,
            "checkout": checkoutdate
        },
        "additionalneeds": additionalneeds
    };

    const response=await request.post(`${BASE_URL}/booking`, {data: requestPayload});
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