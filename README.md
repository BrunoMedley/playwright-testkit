# Playwright TypeScript Automation Framework

A production-ready Playwright automation framework built with TypeScript, following best practices and industry standards.

## 🚀 Features

- ✅ **TypeScript** with strict type safety
- ✅ **Page Object Model (POM)** pattern
- ✅ **Multi-browser** support (Chromium, Firefox, WebKit)
- ✅ **Mobile** testing support (iOS and Android viewports)
- ✅ **Environment configuration** (dev, staging, prod) via `.env` files
- ✅ **Allure + Playwright HTML** reporting
- ✅ **Video, screenshot, and trace** on failure
- ✅ **Parallel execution** and **retries in CI**
- ✅ **API testing** capabilities
- ✅ **Data-driven testing** with JSON
- ✅ **Custom fixtures** for authenticated sessions
- ✅ **GitHub Actions CI/CD** integration

## 📁 Project Structure

```
.
├── config/
│   └── playwright.config.ts      # Playwright configuration
├── env/
│   ├── .env.dev                  # Development environment variables
│   └── .env.staging              # Staging environment variables
├── test-data/
│   └── users.json                # Test data for data-driven tests
├── tests/
│   ├── api/
│   │   └── users.api.spec.ts     # API test examples
│   ├── e2e/
│   │   └── login.spec.ts         # E2E test examples
│   ├── fixtures/
│   │   └── authenticatedUser.ts  # Custom fixtures
│   ├── pages/
│   │   ├── LoginPage.ts          # Page Object Model - Login
│   │   └── DashboardPage.ts      # Page Object Model - Dashboard
│   └── utils/
│       ├── apiClient.ts          # API client utility
│       └── testData.ts           # Test data utilities
├── .github/
│   └── workflows/
│       └── playwright.yml        # GitHub Actions CI workflow
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Setup

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   pnpm exec playwright install
   # or
   npx playwright install
   ```

3. **Configure environment variables:**
   - Copy `.env.dev` and `.env.staging` files
   - Update with your actual environment URLs and credentials

## 📝 Usage

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in UI mode
pnpm test:ui

# Run tests in debug mode
pnpm test:debug

# Run tests in headed mode
pnpm test:headed

# Run tests for specific browser
pnpm test:chromium
pnpm test:firefox
pnpm test:webkit

# Run mobile tests
pnpm test:mobile

# Run API tests only
pnpm test:api

# Run E2E tests only
pnpm test:e2e
```

### Environment Configuration

Set the environment before running tests:

```bash
# Development
NODE_ENV=dev pnpm test

# Staging
NODE_ENV=staging pnpm test
```

### Reports

```bash
# View HTML report
pnpm report

# Generate Allure report
pnpm allure:generate

# Open Allure report
pnpm allure:open

# Serve Allure report (auto-generates)
pnpm allure:serve
```

## 🧪 Writing Tests

### Page Object Model Example

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('username', 'password');
  // ... assertions
});
```

### Using Custom Fixtures

```typescript
import { test, expect } from '../fixtures/authenticatedUser';

test('test with authenticated user', async ({ authenticatedPage, dashboardPage }) => {
  await dashboardPage.verifyOnDashboard();
  // User is already logged in
});
```

### API Testing Example

```typescript
import { test, expect } from '@playwright/test';
import { ApiClient } from '../utils/apiClient';

test('API test', async ({ request }) => {
  const apiClient = new ApiClient(request);
  const response = await apiClient.get('/users');
  expect(response.status()).toBe(200);
});
```

### Data-Driven Testing

```typescript
import { loadTestData } from '../utils/testData';

test('data-driven test', () => {
  const testData = loadTestData();
  for (const user of testData.validUsers) {
    // Test with each user
  }
});
```

## 🔧 Configuration

### Playwright Config

The main configuration is in `config/playwright.config.ts`. Key features:

- **Multi-browser projects**: Chromium, Firefox, WebKit
- **Mobile projects**: Pixel 5, iPhone 12
- **Reporting**: HTML, Allure, JSON
- **Failure artifacts**: Video, screenshots, traces
- **CI optimizations**: Retries, workers configuration

### TypeScript Config

Strict TypeScript configuration with path aliases:
- `@tests/*` → `tests/*`
- `@config/*` → `config/*`
- `@utils/*` → `tests/utils/*`
- `@pages/*` → `tests/pages/*`
- `@fixtures/*` → `tests/fixtures/*`

## 🚀 CI/CD

### GitHub Actions

The workflow (`.github/workflows/playwright.yml`) includes:

- ✅ Automatic test execution on push/PR
- ✅ Parallel test execution with sharding
- ✅ Artifact uploads (reports, screenshots, videos)
- ✅ Allure report generation
- ✅ pnpm support

### CI Secrets

Configure these secrets in GitHub:

- `BASE_URL`: Base URL for tests
- `API_BASE_URL`: API base URL
- `API_KEY`: API authentication key

## 📊 Best Practices

1. **Page Object Model**: All page interactions are abstracted in Page classes
2. **Type Safety**: Strict TypeScript ensures type safety
3. **Environment Management**: Use `.env` files for different environments
4. **Test Data**: Externalize test data in JSON files
5. **Reusable Utilities**: Common functionality in utils
6. **Custom Fixtures**: Reusable test setup/teardown
7. **Parallel Execution**: Tests run in parallel for faster execution
8. **Failure Artifacts**: Automatic capture of videos, screenshots, traces

## 🐛 Debugging

### Debug Mode

```bash
pnpm test:debug
```

### Trace Viewer

Traces are automatically captured on failure. View them:

```bash
pnpm exec playwright show-trace trace.zip
```

### Screenshots and Videos

Automatically saved in `test-results/` directory on failure.

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Allure Report Documentation](https://docs.qameta.io/allure/)

## 📄 License

MIT

