import fs from 'fs';
// import { test } from '@playwright/test';
export class CommonUtility {
    public jsonPath: string;
    public productsData: any;

    constructor(){
        this.jsonPath='tests/testdata/products.json';
        this.productsData=JSON.parse(fs.readFileSync(this.jsonPath, 'utf-8'));
    }
    readData(category: string) {
        const match = this.productsData.find((item: any) => item.category === category);
         return match ? match.names : undefined;
    }
}
// test('data test', async ({ page }) => {
//     const cu=new CommonUtility();
//     console.log('Data',cu.readData('monitors'));
// })