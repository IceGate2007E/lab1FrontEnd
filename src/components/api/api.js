const URL = 'http://localhost:5000';

const postAuth = (body, onSuccess, onFailure) => {
  _fetch('/user/login', onSuccess, onFailure, 'POST', body, false);
};

const postSignup = (body, onSuccess, onFailure) => {
  _fetch('/user/register', onSuccess, onFailure, 'POST', body, false);
};

const getOrigamis = (onSuccess) => {
  _fetch('/getOrigamis', onSuccess, () => {});
};

const postOrigami = (body, onSuccess, onFailure) => {
  _fetch('/origami/create', onSuccess, onFailure, 'POST', body);
};

const postCreateEvent = (body, onSuccess) => {
  _fetch('/event/create', onSuccess, () => {}, 'POST', body);
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

const getMostRecentOrigamis = (onSuccess) => {
  _fetch('/getOrigamis', onSuccess, console.log);
};

const getCategoriesOrigami = (onSuccess) => {
  _fetch('/getOrigamisCategory', onSuccess, console.log);
};

const getEvents = (onSuccess) => {
  _fetch('/getEvents', onSuccess, console.log);
};

const getEventById = (eventId, userId, onSuccess) => {
  _fetch(`/getEventById/${eventId}/${userId}`, onSuccess, console.log, 'GET');
};

const leaveEvent = (eventId, userId, onSuccess) => {
  _fetch(`/leaveEvent/${eventId}/${userId}`, onSuccess, console.log, 'POST');
};

const postOrigamiEvent = (body, eventId, userId, onSuccess) => {
  _fetch(
    `/leaveEvent/${eventId}/${userId}`,
    onSuccess,
    console.log,
    'POST',
    body
  );
};

const voteOrigami = (origamiId, userId, eventId, onSuccess) => {
  _fetch(
    `/voteOrigami/${origamiId}/${userId}/${eventId}`,
    onSuccess,
    console.log,
    'POST'
  );
};

const sendComment = (text, userId, origamiId, onSuccess) => {
  _fetch(`/saveComment/${origamiId}`, onSuccess, console.log, 'POST', {
    text: text,
    userId: userId,
  });
};

const api = {
  postAuth,
  postSignup,
  postOrigami,
  getEvents,
  postCreateEvent,
  getOrigamis,
  getMostRecentOrigamis,
  getCategoriesOrigami,
  getEvents,
  getEventById,
  leaveEvent,
  postOrigamiEvent,
  voteOrigami,
  sendComment,
};

export default api;
