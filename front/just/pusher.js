import Pusher from 'pusher-js';
Pusher.logToConsole = true;
const pusher = new Pusher('5ebb4112c8b3258dbaae', {
    cluster: 'ap2',
    encrypted: true,
});

export default pusher