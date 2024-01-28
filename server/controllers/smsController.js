

const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "67a3bead",
    apiSecret: "1fQWtTPjLDH95T5i"
})

exports.sendSMS = async (req, res) => {
    const from = "Mahmudjon"
    const to = "998956432123"
    const text = 'salom '

    await vonage.sms.send({ to, from, text })
        .then(resp => {
            console.log('Message sent successfully');
            console.log(resp);
            res.status(200).json({ message: 'Message sent successfully', response: resp });
        })
        .catch(err => {
            console.log('There was an error sending the messages.');
            console.error(err);
            res.status(500).json({ message: 'There was an error sending the messages.', error: err });
        });
}
