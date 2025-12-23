import client from './axiosClient.js';

const API_BASE = 'http://localhost:5000/api/users';

// Upload profile photo
export const uploadProfilePhoto = (formData) =>
  client.post('/users/upload-photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Update user profile
export const updateProfile = (profileData) =>
  client.put('/users/profile', profileData);

// Get user profile
export const getUserProfile = () =>
  client.get('/users/profile');

// Delete profile photo
export const deleteProfilePhoto = () =>
  client.delete('/users/profile-photo');
