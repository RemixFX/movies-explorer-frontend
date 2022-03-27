class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((message) => Promise.reject(message))
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then(this._checkResponse);
  }

  authorize(email, password ) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(this._checkResponse);
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  logout = () => {
    return fetch(`${this._url}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  url: "https://api.myfilm.nomoredomains.work",
  headers: {
    'Accept': 'application/json',
    "Content-type": "application/json"
  }
});

export default mainApi;
