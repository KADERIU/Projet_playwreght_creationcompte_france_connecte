import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Répertoire contenant  fichiers de test
  fullyParallel: true, // Permet d'exécuter les tests en parallèle
  
  retries: process.env.CI ? 2 : 0, // Réessaie 2 fois en CI
  workers: process.env.CI ? 1 : undefined, // Utilise 1 seul thread en CI, sinon automatiquement défini
  reporter: 'html', // Génère un rapport HTML 
  use: {
    headless: false, // exécutent en mode "headed"
    baseURL: 'https://www.campusfrance.org/fr/user/register', 
    trace: 'on-first-retry', // Génère une trace Playwright lors du premier réessai
    screenshot: 'only-on-failure', // Capture des écrans uniquement en cas d'échec
    video: 'retain-on-failure', // Enregistre des vidéos uniquement si un test échoue
  },
  projects: [
    // Navigateurs de bureau
    {
      name: 'Desktop Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] },
    },
    // Appareils mobiles
    {
      name: 'iPhone 14',
      use: { ...devices['iPhone 14'] }, // Profils préconfigurés pour iPhone 14
    },
    
  ],
});

