import Pusher from 'pusher-js';
Pusher.logToConsole = true;
const pusher = new Pusher('c9c37556d36119edfc7a', {
    cluster: 'ap2',
    encrypted: true,
});

export default pusher