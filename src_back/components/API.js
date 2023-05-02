export class API {
  constructor({ address, token, groupId }) {
    this.address = address;
    this.token = token;
    this.groupId = groupId;
  }

  getUserData() {
    return fetch(`${this.address}${this.groupId}/users/me`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error(`${response.status} ${response.statusText}`));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateAvatar(avatar) {
    return fetch(`${this.address}${this.groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: this.token,
      },
      body: JSON.stringify({ avatar }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error(`${response.status} ${response.statusText}`));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getCardData() {
    return fetch(`${this.address}${this.groupId}/cards`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error(`${response.status} ${response.statusText}`));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateUserData({ name, about }) {
    return fetch(`${this.address}${this.groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, about }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error(`${response.status} ${response.statusText}`));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addCard({ name, link }) {
    return fetch(`${this.address}${this.groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, link }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error(`${response.status} ${response.statusText}`));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
  deleteCard(cardId) {
    return fetch(`${this.address}${this.groupId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error(`${response.status} ${response.statusText}`));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addLike(cardId) {
    return fetch(`${this.address}${this.groupId}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error(`${response.status} ${response.statusText}`));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteLike(cardId) {
    return fetch(`${this.address}${this.groupId}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error(`${response.status} ${response.statusText}`));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}