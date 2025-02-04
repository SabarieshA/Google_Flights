const config = {
    api: 'https://sky-scrapper.p.rapidapi.com',
    options: {
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
        'x-rapidapi-key': 'a740029c80msh684a169f31cc634p1c6c5ajsn5d121f827edb',
      },
    },
  };
  
  const httpGet = (endpoint) => {
    return fetch(`${config.api}${endpoint}`, {
      ...config.options,
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };
  
  const httpPost = (endpoint, data) => {
    return fetch(`${config.api}${endpoint}`, {
      method: 'post',
      body: data ? JSON.stringify(data) : null,
      ...config.options,
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };
  
  const httpPut = (endpoint, data) => {
    return fetch(`${config.api}${endpoint}`, {
      method: 'put',
      body: data ? JSON.stringify(data) : null,
      ...config.options,
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };
  
  const httpDelete = (endpoint, data) => {
    return fetch(`${config.api}${endpoint}`, {
      method: 'delete',
      ...config.options,
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };
  
  const handleResponse = (response) => {
    // You can handle 400 errors as well.
    if (response.status === 200) {
      return response.json();
    } else {
      throw Error(response.json() | 'error');
    }
  };
  
  export default { httpGet, httpPost, httpPut, httpDelete };
  