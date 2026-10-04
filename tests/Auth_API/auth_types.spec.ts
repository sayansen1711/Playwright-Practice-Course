import { test, expect } from '@playwright/test';
import { Buffer } from 'buffer';
import dotenv from 'dotenv';

dotenv.config();  //Load .env file from project

test.describe('API Authentication Tests', async () => {
    test('1. No Authentication', async ({ request }) => {
        const apiCall = await request.get('https://jsonplaceholder.typicode.com/todos/1');
        expect(apiCall.status()).toBe(200);
        expect(apiCall.statusText()).toBe('OK');
    })
    test('2. Basic Authentication', async ({ request }) => {
        const username = process.env.BASIC_AUTH_USERNAME;
        const password = process.env.BASIC_AUTH_PASSWORD;
        const encryptedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
        const apiCall = await request.get('https://postman-echo.com/basic-auth', {
            headers: {
                Authorization: `Basic ${encryptedCredentials}`
            }
        });
        expect(apiCall.status()).toBe(200);
        expect(apiCall.statusText()).toBe('OK');

        const responseBody = await apiCall.json();
        console.log('\nResponse Body:', responseBody);

        expect(responseBody.authenticated).toBe(true);
    })
    test('3. API Key Authentication (Open Weather API)', async ({ request }) => {
        //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

        const appId = process.env.WEATHER_API_KEY;
        const latitude = 44.34;
        const longitude = 10.99;

        const apiCall = await request.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat: latitude,
                lon: longitude,
                appid: appId!
            }
        });
        expect(apiCall.status()).toBe(200);
        expect(apiCall.statusText()).toBe('OK');

        const responseBody = await apiCall.json();
        console.log('\nResponse Body:', responseBody);

        expect(responseBody.coord).toMatchObject({ "lon": longitude, "lat": latitude });
        expect(responseBody).toHaveProperty('weather');
    })
    test('4. Bearer Token(JWT) Authentication', async ({ request }) => {
        const accessToken = process.env.GITHUB_TOKEN;
        const url = 'https://api.github.com/user/repos';
        const response = await request.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const repoList: string[] = [];
        for (let object of responseBody) {
            repoList.push(object.name);
        }
        console.log('The Repos are:\n', repoList);
    })
})

