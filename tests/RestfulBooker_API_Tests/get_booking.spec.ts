import { test, expect } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

test('GET Booking Details by ID - Path Param', async ({ request }) => {

    const bookingID = 1399;

    const response = await request.get(`${BASE_URL}/booking/${bookingID}`);
    console.log('****Response****\n', response);
    const responseBody = await response.json();
    console.log('****Response Body****\n', responseBody);

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');

    expect(responseBody).toHaveProperty('firstname');
    expect(responseBody).toHaveProperty('lastname');
    expect(responseBody).toHaveProperty('totalprice');
})

test.only('GET Booking Details by Name - Query Param', async ({ request }) => {

    const firstname = 'John';
    const lastname = 'Smith';

    const response = await request.get(`${BASE_URL}/booking`, { params: { firstname, lastname } });
    const responseBody = await response.json();
    console.log('****Response Body****\n', responseBody);

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');

    //Verify the booking id should be a number and the count should be greater than 0
    for (const item of responseBody) {
        expect(item).toHaveProperty('bookingid');
        expect(item.bookingid).toEqual(expect.any(Number));
        expect(item.bookingid).toBeGreaterThan(0);
    }
})