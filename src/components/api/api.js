const URL = 'http://localhost:5000';

const postAuth = (body, onSuccess, onFailure) => {
  _fetch('/user/login', onSuccess, onFailure, 'POST', body, false);
};

const postSignup = (body, onSuccess, onFailure) => {
  _fetch('/user/register', onSuccess, onFailure, 'POST', body, false);
};

const getOrigamis = (onSuccess) => {
  _fetch('/origami/all', onSuccess, () => {});
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
  _fetch('/origami/recent', onSuccess, console.log);
};

const getCategoriesOrigami = (onSuccess) => {
  _fetch('/origami/category', onSuccess, console.log);
};

const getEvents = (onSuccess) => {
  _fetch('/event/all', onSuccess, console.log);
};

const getEventById = (eventId, userId, onSuccess) => {
  _fetch(`/event/${eventId}/${userId}`, onSuccess, console.log, 'GET');
};

const leaveEvent = (eventId, userId, onSuccess) => {
  _fetch(`/event/leave/${eventId}/${userId}`, onSuccess, console.log, 'POST');
};

const postOrigamiEvent = (body, eventId, userId, onSuccess) => {
  _fetch(
    `/event/add/${eventId}/${userId}`,
    onSuccess,
    console.log,
    'POST',
    body
  );
};

const voteOrigami = (origamiId, userId, eventId, onSuccess) => {
  _fetch(
    `/event/vote/${eventId}/${userId}/${origamiId}`,
    onSuccess,
    console.log,
    'POST'
  );
};

const sendComment = (text, userId, origamiId, onSuccess) => {
  _fetch(`/origami/comment/${origamiId}`, onSuccess, console.log, 'POST', {
    text: text,
    userId: userId,
  });
};

const finishEvent = (eventId, onSuccess) => {
  _fetch(`/finishEvent/${eventId}`, onSuccess, console.log, 'POST');
};

const filterOrigami = (body, onSuccess) => {
  _fetch('/filterOrigami', onSuccess, console.log, 'POST', body);
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
  getEventById,
  leaveEvent,
  postOrigamiEvent,
  voteOrigami,
  sendComment,
  finishEvent,
  filterOrigami,
};

export default api;
