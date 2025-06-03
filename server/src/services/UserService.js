const e = require("express");
const { gennerralAccessToken } = require("./JwtService");

const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "OK",
          message: "The email is already",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      console.log("hash", hash);
      const createUser = await User.create({
        name,
        email,
        password: hash,
        phone,
      });
      if (createUser) {
        resolve({
          status: "OK",
          message: "Success",
          data: createUser,
        });
      }
    } catch (error) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defied",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      console.log("comparePassword", comparePassword);

      if (!comparePassword) {
        resolve({
          status: "OK",
          message: "The password or user is incorrect",
        });
      }
      const access_token = await gennerralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await gennerralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "Ok",
        message: "Success",
        access_token,
        refresh_token,
      });
    } catch (error) {
      console.log("Lỗi khi tạo người dùng:", error);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defied",
        });
      }

      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
      console.log("updateUser", updateUser);

      resolve({
        status: "Ok",
        message: "Success",
        data: updateUser,
      });
    } catch (error) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defied",
        });
      }

      await User.findByIdAndDelete(id);
      resolve({
        status: "Ok",
        message: "Delete user sucess",
      });
    } catch (error) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      resolve({
        status: "Ok",
        message: "sucess",
        data: allUser,
      });
    } catch (error) {
      reject(e);
    }
  });
};

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const User = await User.findOne({
        _id: id,
      });
      if (User === null) {
        resolve({
          status: "OK",
          message: "The user is not defied",
        });
      }

      resolve({
        status: "Ok",
        message: " sucess",
        data: User,
      });
    } catch (error) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
};
