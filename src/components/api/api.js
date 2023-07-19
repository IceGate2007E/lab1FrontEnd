const URL = 'http://localhost:5000';

const postAuth = (body, onSuccess, onFailure) => {
  _fetch('/user/register', onSuccess, onFailure, 'POST', body, false);
};

const postSignup = (body, onSuccess, onFailure) => {
  _fetch('/user/login', onSuccess, onFailure, 'POST', body, false);
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

const postCreateEvent = (body) => {
  _fetch(
    '/',
    (res) => console.log(res),
    () => alert('Failed'),
    'POST',
    body
  );
};

const _fetch = (
  path,
  onSuccess,
  onFailure,
  method = 'GET',
  body,
  auth = true
) => {
  let req = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let token = auth
    ? JSON.parse(localStorage.getItem('orukami_user'))?.token || ''
    : '';
  auth && (req.headers.Authorization = 'Bearer ' + token);
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
  postCreateEvent,
};

export default api;
