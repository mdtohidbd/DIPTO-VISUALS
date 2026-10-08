const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000/api';
    }
  }
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

const getHeaders = (isMultipart = false) => {
  const token = localStorage.getItem('token');
  const headers = {};
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `API error (${res.status})`);
  }
  return res.json();
};

export const api = {
  // Authentication
  login: async (username, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await handleResponse(res);
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.admin.username);
    return data;
  },

  verifyToken: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'GET',
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },

  updatePassword: async (oldPassword, newPassword) => {
    const res = await fetch(`${API_BASE_URL}/auth/update-password`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ oldPassword, newPassword })
    });
    return handleResponse(res);
  },

  // Projects
  getProjects: async () => {
    const res = await fetch(`${API_BASE_URL}/projects`);
    return handleResponse(res);
  },

  createProject: async (projectData) => {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(projectData)
    });
    return handleResponse(res);
  },

  updateProject: async (id, projectData) => {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(projectData)
    });
    return handleResponse(res);
  },

  deleteProject: async (id) => {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  // Client Works
  getClientWorks: async () => {
    const res = await fetch(`${API_BASE_URL}/client-works`);
    return handleResponse(res);
  },

  createClientWork: async (workData) => {
    const res = await fetch(`${API_BASE_URL}/client-works`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(workData)
    });
    return handleResponse(res);
  },

  updateClientWork: async (id, workData) => {
    const res = await fetch(`${API_BASE_URL}/client-works/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(workData)
    });
    return handleResponse(res);
  },

  deleteClientWork: async (id) => {
    const res = await fetch(`${API_BASE_URL}/client-works/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  // Testimonials
  getTestimonials: async () => {
    const res = await fetch(`${API_BASE_URL}/testimonials`);
    return handleResponse(res);
  },

  createTestimonial: async (testimonialData) => {
    const res = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(testimonialData)
    });
    return handleResponse(res);
  },

  updateTestimonial: async (id, testimonialData) => {
    const res = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(testimonialData)
    });
    return handleResponse(res);
  },

  deleteTestimonial: async (id) => {
    const res = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  // Messages
  getMessages: async () => {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'GET',
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  deleteMessage: async (id) => {
    const res = await fetch(`${API_BASE_URL}/contact/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  // Media Upload with Progress Tracking
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData
    });
    return handleResponse(res);
  },

  uploadVideo: (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('video', file);

      xhr.open('POST', `${API_BASE_URL}/upload/video`, true);

      const token = localStorage.getItem('token');
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }

      if (xhr.upload && onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            onProgress(percentComplete);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (e) {
            resolve({ url: xhr.responseText });
          }
        } else {
          try {
            const errResponse = JSON.parse(xhr.responseText);
            reject(new Error(errResponse.message || `Upload failed with status ${xhr.status}`));
          } catch (e) {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        }
      };

      xhr.onerror = () => {
        reject(new Error('Network error occurred during video upload.'));
      };

      xhr.send(formData);
    });
  },

  uploadFile: (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('file', file);

      xhr.open('POST', `${API_BASE_URL}/upload`, true);

      const token = localStorage.getItem('token');
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }

      if (xhr.upload && onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            onProgress(percentComplete);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (e) {
            resolve({ url: xhr.responseText });
          }
        } else {
          try {
            const errResponse = JSON.parse(xhr.responseText);
            reject(new Error(errResponse.message || `Upload failed (${xhr.status})`));
          } catch (e) {
            reject(new Error(`Upload failed (${xhr.status})`));
          }
        }
      };

      xhr.onerror = () => reject(new Error('Network error during file upload.'));
      xhr.send(formData);
    });
  },

  // Theme & Visual Settings
  getTheme: async () => {
    const res = await fetch(`${API_BASE_URL}/settings/theme`);
    return handleResponse(res);
  },

  updateTheme: async (themeData) => {
    const res = await fetch(`${API_BASE_URL}/settings/theme`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(themeData)
    });
    return handleResponse(res);
  },

  // Site Profile & Content Settings
  getSiteConfig: async () => {
    const res = await fetch(`${API_BASE_URL}/settings/config`);
    return handleResponse(res);
  },

  updateSiteConfig: async (configData) => {
    const res = await fetch(`${API_BASE_URL}/settings/config`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(configData)
    });
    return handleResponse(res);
  }
};
