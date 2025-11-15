# Quick Start Guide

## Installation

1. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   pnpm exec playwright install
   ```

3. Configure environment:
   - Update `env/.env.dev` and `env/.env.staging` with your actual URLs and credentials

## Run Your First Test

```bash
# Run all tests
pnpm test

# Run in UI mode (recommended for first time)
pnpm test:ui

# Run specific test file
pnpm test tests/e2e/login.spec.ts
```

## View Reports

```bash
# HTML Report
pnpm report

# Allure Report
pnpm allure:generate
pnpm allure:open
```

## Next Steps

1. Update locators in Page Objects (`tests/pages/`) to match your application
2. Update test data in `test-data/users.json`
3. Configure environment variables in `env/` directory
4. Customize `config/playwright.config.ts` for your needs

For detailed documentation, see [README.md](./README.md)
