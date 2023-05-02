export class API {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  __checkResponse(response) {
    return response.ok ? response.json() : Promise.reject(new Error(`${response.status} ${response.statusText}`));
  }

  __request(slug, options = {}) {
    const url = `${this._baseUrl}${slug}`;
    const fetchOptions = {
      headers: { ...this._headers },
      ...options,
    }

    return fetch(url, fetchOptions).then(this.__checkResponse);
  }

  getUserData() {
    const slug = `/users/me`;

    return this.__request(slug);
  }

  updateAvatar(avatar) {
    const slug = `/users/me/avatar`;
    const options = {
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
    };

    return this.__request(slug, options);
  }

  getCardData() {
    const slug = `/cards`;

    return this.__request(slug);
  }

  updateUserData({ name, about }) {
    const slug = `/users/me`;
    const options = {
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
    };

    return this.__request(slug, options);
  }

  addCard({ name, link }) {
    const slug = `/cards`;
    const options = {
      method: 'POST',
      body: JSON.stringify({ name, link }),
    };

    return this.__request(slug, options);
  }
  
  deleteCard(cardId) {
    const slug = `/cards/${cardId}`;
    const options = {
      method: 'DELETE',
    };

    return this.__request(slug, options);
  }

  addLike(cardId) {
    const slug = `/cards/${cardId}/likes`;
    const options = {
      method: 'PUT',
    };

    return this.__request(slug, options);
  }

  deleteLike(cardId) {
    const slug = `/cards/${cardId}/likes`;
    const options = {
      method: 'DELETE',
    };

    return this.__request(slug, options);
  }
}