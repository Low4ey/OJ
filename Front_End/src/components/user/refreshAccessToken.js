const refreshAccessToken = async () => {
    try {
      // Retrieve the refresh token from browser storage
      const refreshToken = localStorage.getItem("refreshToken");
  
      // Send a POST request to the backend API to refresh the access token
      const response = await fetch("/user/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });
  
      if (!response.ok) {
        throw new Error("Error refreshing access token");
      }
  
      // Retrieve the new access token from the response if necessary
      const { accessToken } = await response.json();
  
      // Store the new access token in the browser's storage
      localStorage.setItem("accessToken", accessToken);
  
      return accessToken;
    } catch (error) {
      // Handle error responses
      console.error("Error refreshing access token:", error.message);
      throw error;
    }
  };
  
  export default refreshAccessToken;
  