/*
https://fakeapi.platzi.com/en/rest/files/ 
*/
import { test, expect } from '@playwright/test';
import fs from 'fs';

test.describe.serial('File Upload and Download API', () => {
    
    let textFileName: string;
    let filePath='./tests/testdata';
    let filename='upload_file.txt'
    const baseUrl='https://api.escuelajs.co/api/v1/files';

    test('Upload file using POST request', async({request})=>{
        const apiCall=await request.post(`${baseUrl}/upload`, {
            multipart: {
                file:{
                    name: 'upload_file.txt',
                    mimeType: 'text/plain',
                    buffer: fs.readFileSync(`${filePath}/${filename}`)
                }
            }
        })
        expect(apiCall.status()).toBe(201);
        const responseBody=await apiCall.json();
        console.log(responseBody);
        expect(responseBody.originalname).toBe(filename);
        textFileName=responseBody.filename;
    })

    test('Download the file using GET request', async({request})=>{
        const apiCall=await request.get(`${baseUrl}/${textFileName}`);
        expect(apiCall.status()).toBe(200);
        console.log(await apiCall.text());
    })
})