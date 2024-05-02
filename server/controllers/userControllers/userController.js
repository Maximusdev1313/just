const User = require('../../models/users/user');
const bcrypt = require('bcryptjs');

exports.getUser = async (req, res) => {
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
        console.log(req.body);
        const user = await User.findOne({ name: req.body.name });
        console.log(user);
        if (!user) {
            return res.status(200).json({ message: 'User topilmadi' });
        }
        console.log(req.body);

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
            name: user.name,
            phone_number: user.phone_number,
            market_name: user.market_name,
            password: user.password,
            role: user.role,
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
