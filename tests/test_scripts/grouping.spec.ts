import {test} from '@playwright/test';

test.describe('Group1', async ()=>{
    test('Test 1', async ()=>{
        console.log('Test 1 executed');
    })

    test('Test 2', async ()=>{
        console.log('Test 2 executed');
    })
})
test.describe('Group2', async ()=>{
    test('Test 3', async ()=>{
        console.log('Test 1 executed');
    })

    test('Test 4', async ()=>{
        console.log('Test 2 executed');
    })
})