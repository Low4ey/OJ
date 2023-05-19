import axios from 'axios';

const refreshAccessToken = async () => {
  try {
    // Retrieve the refresh token from browser storage
    const refreshToken = localStorage.getItem('refreshToken');

    // Send a POST request to the backend API to refresh the access token
    const response = await axios.post('/user/refresh-token', { refreshToken });
    const { accessToken } = response.data;

    // Store the new access token in the browser's storage
    localStorage.setItem('accessToken', accessToken);

    return accessToken;
  } catch (error) {
    // Handle error responses
    console.error('Error refreshing access token:', error.message);
    throw error;
  }
};

export default refreshAccessToken;
