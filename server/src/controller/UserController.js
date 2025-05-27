const UserService = require('../services/UserService');

const createUser = async (req, res) => {
    try {
        const res = await UserService.createUser();
        return res.status(201).json(res);
    } catch (error) {
        return res.status(400).json({
            message: 'Lỗi khi tạo người dùng',
            error: error.message
        });
    }
}

module.exports = {
    createUser
};