// import axios from 'axios';
//url Pablo: https://6644bc5eb8925626f88fb873.mockapi.io/api/v1/
//url propia: https://6644bc3ab8925626f88fb747.mockapi.io/api/v1/

async function fetchFromApi(endpoint, options = {}) {
  const url = `https://6644bc3ab8925626f88fb747.mockapi.io/api/v1/${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const settings = {
    method: options.method || 'GET',
    headers: { ...defaultHeaders, ...options.headers },
    ...options,
  };

  if (options.body) {
    settings.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, settings);
    console.log('response', response);

    if (!response.ok) {
      const errorText = await response.text(); // Obtenim el text de l'error
      console.error('Error response from API:', errorText);
      throw new Error(`Failed to fetch data from the API: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export default fetchFromApi;
