import { test, expect } from '@playwright/test';
import { ApiClient } from '../utils/apiClient';

test.describe('Users API Tests', () => {
  let apiClient: ApiClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
  });

  test('should get list of users', async () => {
    const response = await apiClient.get('/users');
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test('should get user by ID', async () => {
    const userId = 1;
    const response = await apiClient.get(`/users/${userId}`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.id).toBe(userId);
  });

  test('should create a new user', async () => {
    const newUser = {
      name: 'Test User',
      email: `testuser${Date.now()}@example.com`,
      username: `testuser${Date.now()}`,
    };

    const response = await apiClient.post('/users', newUser);
    
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.email).toBe(newUser.email);
  });

  test('should update an existing user', async () => {
    const userId = 1;
    const updateData = {
      name: 'Updated User Name',
      email: 'updated@example.com',
    };

    const response = await apiClient.put(`/users/${userId}`, updateData);
    
    // API might return 200 or 204
    expect([200, 204]).toContain(response.status());
    
    if (response.status() === 200) {
      const body = await response.json();
      expect(body.name).toBe(updateData.name);
    }
  });

  test('should partially update a user', async () => {
    const userId = 1;
    const updateData = {
      name: 'Partially Updated Name',
    };

    const response = await apiClient.patch(`/users/${userId}`, updateData);
    
    expect([200, 204]).toContain(response.status());
  });

  test('should delete a user', async () => {
    // First create a user to delete
    const newUser = {
      name: 'User to Delete',
      email: `deleteme${Date.now()}@example.com`,
      username: `deleteme${Date.now()}`,
    };

    const createResponse = await apiClient.post('/users', newUser);
    expect(createResponse.status()).toBe(201);
    const createdUser = await createResponse.json();
    const userId = createdUser.id;

    // Now delete the user
    const deleteResponse = await apiClient.delete(`/users/${userId}`);
    expect([200, 204]).toContain(deleteResponse.status());

    // Verify user is deleted
    const getResponse = await apiClient.get(`/users/${userId}`);
    expect(getResponse.status()).toBe(404);
  });

  test('should return 404 for non-existent user', async () => {
    const nonExistentId = 99999;
    const response = await apiClient.get(`/users/${nonExistentId}`);
    
    expect(response.status()).toBe(404);
  });

  test('should validate required fields on user creation', async () => {
    const invalidUser = {
      // Missing required fields
      name: 'Test',
    };

    const response = await apiClient.post('/users', invalidUser);
    
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty('error');
  });

  test('should handle pagination for users list', async () => {
    const response = await apiClient.get('/users?page=1&limit=10');
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // Response might be an array or an object with pagination metadata
    if (Array.isArray(body)) {
      expect(body.length).toBeLessThanOrEqual(10);
    } else {
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty('page');
      expect(body).toHaveProperty('limit');
    }
  });

  test('should filter users by query parameters', async () => {
    const response = await apiClient.get('/users?role=admin');
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    if (Array.isArray(body)) {
      // Verify all returned users have admin role
      for (const user of body) {
        expect(user.role).toBe('admin');
      }
    }
  });
});

