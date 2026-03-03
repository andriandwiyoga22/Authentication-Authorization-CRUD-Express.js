import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const adminPage = async (req, res) => {
    const users = await User.find({ username: { $ne: 'admin' } });
    res.render('admin', { users });
};

export const getEditUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('editUser', { user });
};

export const editUser = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(id, {
        username,
        password: hashedPassword
    });

    res.redirect('/admin');
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/admin');
};