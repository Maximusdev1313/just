import Pusher from 'pusher-js';
Pusher.logToConsole = true;
const pusher = new Pusher('87f10baf18f1f0f0ecf4', {
    cluster: 'ap1',
    encrypted: true,
});

export default pusher