const URL = 'http://localhost:5000';

const postAuth = (body, onSuccess, onFailure) => {
  _fetch('/auth', onSuccess, onFailure, 'POST', body);
};

const postSignup = (body, onSuccess, onFailure) => {
  _fetch('/signup', onSuccess, onFailure, 'POST', body);
};

const postOrigami = (body) => {
  _fetch(
    '/uploadOrigami',
    () => alert('Sended'),
    () => alert('Failed'),
    'POST',
    body
  );
};

const getEvents = () => {
  _fetch(
    '/event/get/all',
    (res) => console.log(res),
    () => alert('Failed')
  );
};

const _fetch = (path, onSuccess, onFailure, method = 'GET', body) => {
  let req = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  body && (req.body = JSON.stringify(body));
  fetch(URL + path, req)
    .then((response) => {
      if (response.status === 200) response.json().then(onSuccess);
      else response.json().then(onFailure);
    })
    .catch(() => {
      onFailure({ message: 'Error connecting to server.' });
    });
};

const api = {
  postAuth,
  postSignup,
  postOrigami,
  getEvents,
};

export default api;
