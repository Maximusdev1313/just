const User = require('../../models/users/owner');
const bcrypt = require('bcrypt');

exports.getOwner = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: 'not found' })
    }
}

exports.register = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        // Get the user from the request body
        const requested_owner = req.body.owner_name.toLowerCase()
        console.log(requested_owner);
        const user = await User.findOne({ owner_name: requested_owner });
        console.log(user);
        if (!user) {
            return res.status(200).json({ message: 'User topilmadi' });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).json({ message: 'Iltimos parolni to\'g\'ri kiriting' });
        }

        // Create a token
        const token = jwt.sign({ id: user._id }, 'max');

        // Send the token in a cookie
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({
            id: user._id,
            owner_name: user.owner_name,
            phone_number: user.phone_number,
            market_name: user.market_name,
            money: user.money,
            is_active: user.is_active,
            last_activation: user.last_activation,
            message: 'Muvafaqiyatli'
        });
        // res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error logging in', error });
    }
};
