import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    workers: '75%',
    reporter: [['html'], ['github'], ['list']],
    projects: [
        {
            name: 'capslock',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: 'https://test-qa.capslock.global',
                headless: true,
                trace: 'on',
                video: 'on',
            },

        }
    ],
});
