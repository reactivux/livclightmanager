import axios from 'axios';

console.log('Base URL:', import.meta.env.VITE_API_BASE_URL);

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adding an interceptor to attach the token
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('bearerToken');
  console.log('Token from local storage:', token); // Logging the token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization Header:', config.headers.Authorization); // Logging the Authorization header
  }
  return config;
});

export async function signin(email: string, password: string) {
  try {
    const response = await apiClient.post('/signin', {
      email,
      password,
    });

    // Check roles
    const roles = JSON.parse(response.data.data.roles);
    if (roles.includes('admin')) {
      localStorage.setItem('bearerToken', response.data.accessToken);
      localStorage.setItem('uuid', response.data.data.uuid);
      return response.data;
    } else {
      throw new Error('Unauthorized: User does not have the required role');
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Sign-in failed');
    } else {
      throw new Error('Sign-in failed');
    }
  }
}

// Get Orders
export async function getOrders() {
  try {
    const uuid = localStorage.getItem('uuid');
    console.log('UUID from local storage:', uuid);
    if (!uuid) {
      throw new Error('UUID is missing from local storage');
    }
    const response = await apiClient.get(`/orders/unstructured/${uuid}`);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}
// Get Historical Orders with Pagination
export async function getHistoricalOrders(page: number) {
  try {
    const uuid = localStorage.getItem('uuid');
    if (!uuid) {
      throw new Error('UUID is missing from local storage');
    }
    const response = await apiClient.get(`/historiques-orders/${uuid}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical orders:', error);
    throw error;
  }
}
export async function updateOrderStatus(orderId: number, status: string) {
  try {
    const uuid = localStorage.getItem('uuid');
    if (!uuid) {
      throw new Error('UUID is missing from local storage');
    }
    const response = await apiClient.post(`/orders/${uuid}/status`, {
      order_id: orderId,
      status: status,
    });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}