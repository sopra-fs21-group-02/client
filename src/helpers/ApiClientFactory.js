import { ApiClient } from 'sopra-fs21-group-02-dogs-api';
import { getDomain } from './getDomain';

const GetApiClient = () => {
  let client = new ApiClient();
  let token = localStorage.getItem('accessToken');
  let basePath = getDomain() + '/v1';
  
  client.basePath = basePath;
  if (token !== null && token !== undefined && token.length > 0) {
    client.defaultHeaders['Authorization'] = 'Bearer ' + token;
  }

  // Remove user agent header (can't be set!)
  delete client.defaultHeaders['User-Agent'];

  return client;
}

export default GetApiClient;