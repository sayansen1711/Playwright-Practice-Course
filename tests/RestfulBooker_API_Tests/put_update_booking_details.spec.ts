import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import fs from 'fs'
/**
 * API Chaining: 
 * Create booking -> booking id
 * booking id -> Get booking
 * booking id + request payload -> Partially Update booking (PATCH)
 * booking id + request payload -> Completely Update booking (PUT)
 * booking id -> Delete booking
 */
const BASE_URL = 'https://restful-booker.herokuapp.com';

function readJson(filename: string) {
    const jsonPath = `tests/testdata/${filename}`;
    const requestPayload = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    return requestPayload;
}


test('Update booking - Create, Get, Partially update and Update a booking record', async ({ request }) => {

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

    let bookingId: number;
    let authToken: string;

    await test.step('Step 1: Create Booking', async () => {
        const createResponse = await request.post(`${BASE_URL}/booking`, { data: requestPayload });
        expect(createResponse.status()).toBe(200);
        expect(createResponse.statusText()).toBe('OK');
        const createBooking = await createResponse.json();
        bookingId = createBooking.bookingid; //extracting booking id from response
    })

    await test.step('Step 2: Get Booking', async () => {
        const getResponse = await request.get(`${BASE_URL}/booking/${bookingId}`);
        expect(getResponse.status()).toBe(200);
        expect(getResponse.statusText()).toBe('OK');
        const getBooking = await getResponse.json();
        console.log('Booking details before Update:\n', getBooking);
    })

    await test.step('Step 3.1: Create a token for PUT, PATCH and DELETE requests', async () => {
        const requestPayload = readJson('token_request_body.json');
        const authResponse = await request.post(`${BASE_URL}/auth`, { data: requestPayload });
        const authBody = await authResponse.json();
        authToken = authBody.token;
        console.log('Auth Token: ', authToken);
    })

    await test.step('Step 3.2: Partially Update Booking Data', async () => {
        const partialUpdateData = readJson('partial_update_data.json');
        const patchResponse = await request.patch(`${BASE_URL}/booking/${bookingId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `token=${authToken}`
                },
            data: partialUpdateData
        });
        expect(patchResponse.status()).toBe(200);
        expect(patchResponse.statusText()).toBe('OK');

        const partialBookingDetails=await patchResponse.json();
        console.log(`After partially updating booking id ${bookingId}, the response is:\n`,partialBookingDetails);    
    })
    
    await test.step('Step 3.3: Fully Update Booking Data', async () => {

        const updateData = readJson('booking_request_payload.json');
        const putResponse = await request.put(`${BASE_URL}/booking/${bookingId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `token=${authToken}`
                },
            data: updateData
        });
        expect(putResponse.status()).toBe(200);
        expect(putResponse.statusText()).toBe('OK');

        const updatedBookingDetails=await putResponse.json();
        console.log(`After fully updating booking id ${bookingId}, the response is:\n`,updatedBookingDetails);  
    });

    await test.step('Step 4: DELETE a booking request using ID', async()=>{
        const deleteRequest=await request.delete(`${BASE_URL}/booking/${bookingId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `token=${authToken}`
                }
            }
        );
        expect(deleteRequest.status()).toBe(201);
        expect(deleteRequest.statusText()).toBe('Created');
        const getRequest= await request.get(`${BASE_URL}/booking/${bookingId}`);
        expect(getRequest.status()).toBe(404);
        expect(getRequest.statusText()).toBe('Not Found');
        console.log(`After deleting ${bookingId}, the GET request returns Null`);
    })
})