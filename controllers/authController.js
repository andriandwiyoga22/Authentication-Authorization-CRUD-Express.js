import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const getHome = (req, res) => {
    res.render('index');
};

export const getRegister = (req, res) => {
    res.render('register');
};

export const getLogin = (req, res) => {
    res.render('login');
};

export const register = async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        req.flash('error', 'Username already in use');
        return res.redirect('/register');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        password: hashedPassword
    });

    await user.save();
    req.flash('success', 'Registration successful, please login');
    res.redirect('/login');
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        req.flash('error', 'Username tidak ditemukan');
        return res.redirect('/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        req.flash('error', 'Password salah');
        return res.redirect('/login');
    }

    req.session.user = {
        id: user._id,
        username: user.username
    };

    if (user.username === 'admin') {
        return res.redirect('/admin');
    }

    res.redirect('/dashboard');
};

export const dashboard = (req, res) => {
    res.render('dashboard');
};

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};