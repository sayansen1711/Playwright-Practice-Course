import fs from 'fs';
// import { test } from '@playwright/test';
export class CommonUtility {
    public jsonPath: string;
    public jsonData: any;

    constructor(path: string){
        this.jsonPath=path; 
        this.jsonData=JSON.parse(fs.readFileSync(this.jsonPath, 'utf-8'));
    }
    readData(category: string) {
        const match = this.jsonData.find((item: any) => item.category === category);
        return match ? match.names : undefined;
    }
}