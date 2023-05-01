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



//   editUserInfo(data) {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify({
//         name: data.name,
//         about: data.about
//       })
//     })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Error: ${res.status}`);
//     });
//   }

//   addCard(data) {
//     return fetch(`${this._baseUrl}/cards`, {
//       method: 'POST',
//       headers: this._headers,
//       body: JSON.stringify({
//         name: data.name,
//         link: data.link
//       })
//     })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Error: ${res.status}`);
//     });
//   }

//   removeCard(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}`, {
//       method: 'DELETE',
//       headers: this._headers
//     })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Error: ${res.status}`);
//     });
//   }

//   likeCard(cardId) {
//     return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
//       method: 'PUT',
//       headers: this._headers
//     })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Error: ${res.status}`);
//     });
//   }

//   unlikeCard(cardId) {
//     return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
//       method: 'DELETE',
//       headers: this._headers
//     })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Error: ${res.status}`);
//     });
//   }

//   updateAvatar(data) {
//     return fetch(`${this._baseUrl}/users/me/avatar`, {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify({
//         avatar: data.avatar
//       })
//     })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Error: ${res.status}`);
//     });
//   }
// }
