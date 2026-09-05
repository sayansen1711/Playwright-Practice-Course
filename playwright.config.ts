import { defineConfig, devices } from '@playwright/test';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  //changes the global timeout for all tests from 30secs (default) to 60 secs
  timeout: 60000,   
  //set gloabal timeout for all assertions from 5 secs(default) to 10 secs
  expect:{timeout:10000}, 
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    // ['list'],
    // ['line'],
    // ['dot']
    // ['html', {open:'always', outputFolder: 'my-reports'}], //html report
    // ['json', {outputFile: 'my-reports/results.json'}], //JSON report
    // ['junit', {outputFile: 'my-reports/results.xml'}], //Junit xml report
    // ['./utility/CustomReporter.ts', {customOption: 'some value'}],
    // ['allure-playwright',
    //   {
    //     resultsDir: 'allure-results', // Target folder for raw data
    //     detail: true, // Captures steps, hooks, and assertions
    //     suiteTitle: true // Uses file names as suite groups
    //   }
    // ]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // All page navigations across the project will timeout after 20 seconds
    navigationTimeout: 20000, 
    
    // Optional: Sets timeout for actions like click, type, hover (separate from page load)
    actionTimeout: 10000, 
    trace: 'retain-on-failure',
    launchOptions: {
      args:['--start-maximized']
    },
    // viewport: null,
    // deviceScaleFactor: undefined,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
       },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
