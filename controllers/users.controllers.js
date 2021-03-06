// Models
const { User } = require('../models/user.model');

//Utils
const { filterObject } = require('../utils/filterObject');
const { catchAsync } = require('../utils/catchAsync');

const getAllUsers = catchAsync(async (req, res) => {
    const users = await User.findAll({ where: { status: 'active' } });

    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    });
});

const getUserById = catchAsync(async (req, res) => {
    const { user } = req;

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

const createUser = catchAsync(async (req, res) => {
    const { name, email, password, role } = req.body;

    const newUser = await User.create({
        name,
        email,
        password,
        role
    });

    res.status(200).json({
        status: 'success',
        data: {
            newUser
        }
    });
});

const updateUser = catchAsync(async (req, res) => {
    const { user } = req;
    const data = filterObject(req.body, 'name', 'email');

    await user.update({ ...data });

    res.status(204).json({
        status: 'success'
    });
});

const deleteUser = catchAsync(async (req, res) => {
    const { user } = req;
    await user.update({ status: 'disabled' });

    res.status(200).json({
        status: 'success'
    });
});

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
