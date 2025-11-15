import * as fs from 'fs';
import * as path from 'path';

export interface User {
  username: string;
  password: string;
  expectedRole?: string;
  expectedError?: string;
}

export interface TestData {
  validUsers: User[];
  invalidUsers: User[];
}

/**
 * Load test data from JSON file
 */
export function loadTestData(fileName: string = 'users.json'): TestData {
  const filePath = path.resolve(__dirname, `../../test-data/${fileName}`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as TestData;
}

/**
 * Get a random valid user
 */
export function getRandomValidUser(): User {
  const testData = loadTestData();
  const users = testData.validUsers;
  return users[Math.floor(Math.random() * users.length)];
}

/**
 * Get a specific valid user by index
 */
export function getValidUser(index: number = 0): User {
  const testData = loadTestData();
  return testData.validUsers[index];
}

/**
 * Get a specific invalid user by index
 */
export function getInvalidUser(index: number = 0): User {
  const testData = loadTestData();
  return testData.invalidUsers[index];
}

