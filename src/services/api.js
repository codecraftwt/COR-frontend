import axios from 'axios';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

console.log(baseURL, 'baseURL');

export const regUser = async (formData) => {
  try {
    const response = await api.post('/signup', formData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await api.post('/signin', formData);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const onboarding = async (formData) => {
  try{
    const response = await api.post('/onboard', formData);
    return response.data;
  } catch (error) {
    console.error('Error onboarding user:', error);
    throw error;
  }
}

export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post('/request-reset', { email });
    return response.data;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw error;
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await api.post('/reset-password', { token, password });
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

export const generatePressRelease = async (data) => {
  try {
    const response = await api.post('/generate-press-release', data);
    return response.data;
  } catch (error) {
    console.error('Error generating press release:', error);
    throw error;
  }
};

export const generateBlog = async (data) => {
  try {
    const response = await api.post('/generate-blog', data);
    return response.data;
  } catch (error) {
    console.error('Error generating blog:', error);
    throw error;
  }
};

export const saveDraft = async ({ type, content, userEmail }) => {
  try {
    const payload = { type, content, userEmail };
    const response = await api.post('/drafts/save', payload);
    return response.data;
  } catch (error) {
    console.error('Error saving draft:', error);
    throw error;
  }
};

export const getDrafts = async (userEmail) => {
  try {
    if (!userEmail) throw new Error('userEmail is required to fetch drafts');
    const response = await api.get('/drafts', {
      params: { email: userEmail }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching drafts:', error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/user/${encodeURIComponent(email)}`);
};

// Account CRUD APIs
export const createAccount = async (accountData) => {
  try {
    const response = await api.post('/accounts', accountData);
    return response.data;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

export const getAccounts = async () => {
  try {
    const response = await api.get('/accounts');
    return response.data;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

export const getAccountById = async (id) => {
  try {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching account by id:', error);
    throw error;
  }
};

export const updateAccount = async (id, accountData) => {
  try {
    const response = await api.put(`/accounts/${id}`, accountData);
    return response.data;
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
};

export const deleteAccount = async (id) => {
  try {
    const response = await api.delete(`/accounts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};

export const updateDraft = async (id, { type, content, userId }) => {
  try {
    const payload = { type, content };
    if (userId) payload.userId = userId;
    const response = await api.put(`/drafts/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating draft:', error);
    throw error;
  }
};

export const deleteDraft = async (id) => {
  try {
    const response = await api.delete(`/drafts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting draft:', error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const registerOrLoginWithGoogle = async (user) => {
  try {
    const response = await api.post('/google-signup', {
      firstname: user.displayName?.split(' ')[0] || '',
      lastname: user.displayName?.split(' ')[1] || '',
      email: user.email,
      googleId: user.uid,
      photoURL: user.photoURL,
    });
    return response.data;
  } catch (error) {
    console.error('Error registering/logging in with Google:', error);
    throw error;
  }
};

