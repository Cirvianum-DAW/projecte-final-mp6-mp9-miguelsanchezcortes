// import axios from 'axios';
//url Pablo: https://6644bc5eb8925626f88fb873.mockapi.io/api/v1/
//url propia: https://6644bc3ab8925626f88fb747.mockapi.io/

async function fetchFromApi(endpoint, options = {}) {
  const url = `https://6644bc5eb8925626f88fb873.mockapi.io/api/v1/${endpoint}`;
  // const url = `https://6644bc3ab8925626f88fb747.mockapi.io/${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Default settings if none are provided
  const settings = {
    method: 'get', // default method
    headers: { ...defaultHeaders, ...options.headers }, // merge default headers with options.headers
    ...options, // spread the rest of the options
  };

  if (options.body) settings.data = options.body;

  try {
    const response = await fetch(url, settings);
    console.log('response', response);
    if (response.status !== 200) {
      throw new Error('Failed to fetch data from the API');
    }

    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    console.error('Error name:', error.name);
    throw error;
  }
}

export default fetchFromApi;
