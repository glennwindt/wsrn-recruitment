/**
 * Fetches dashboard data from the backend API.
 * @returns {Promise<Object>} Dashboard data or error object
 */
export const fetchDashboardData = async () => {
  try {
    const response = await fetch('/api/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    return { error: true, message: error.message };
  }
};

