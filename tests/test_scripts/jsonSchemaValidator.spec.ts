//install AJV JSON Schema validator library: npm i ajv
import { test, expect } from '@playwright/test';
import * as AjvModule from 'ajv';

test('Schema Validation', async ({ request }) => {
    //send the get request to get the response
    //https://jsonplaceholder.typicode.com/posts/1
    //https://mocktarget.apigee.net/json
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    const responseBody = await response.json();
    console.log(responseBody);

    //define the schema
    /*
{
  "type": "object",
  "properties": {
    "userId": {
      "type": "number"
    },
    "id": {
      "type": "number"
    },
    "title": {
      "type": "string"
    },
    "body": {
      "type": "string"
    }
  },
  "required": [
    "userId",
    "id",
    "title",
    "body"
  ]
}
    */
    /*
    "type": "object",
         "properties": {
             "firstName": {
                 "type": "string"
             },
             "lastName": {
                 "type": "string"
             },
             "city": {
                 "type": "string"
             },
             "state": {
                 "type": "string"
             }
         },
         "required": [
             "firstName",
             "lastName",
             "city",
             "state"
         ]
    */
    const schema = {
        "type": "object",
        "properties": {
            "userId": {
                "type": "number"
            },
            "id": {
                "type": "number"
            },
            "title": {
                "type": "string"
            },
            "body": {
                "type": "string"
            }
        },
        "required": [
            "userId",
            "id",
            "title",
            "body"
        ]
    }

    //validate the schema
    const Ajv = (AjvModule as any).default ?? AjvModule;
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const isValid = validate(responseBody);
    expect(isValid).toBeTruthy();
})