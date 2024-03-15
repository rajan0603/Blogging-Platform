const authServices = require("../services/authServices");

const register = async (req,res) => {
    try{
        const user = await authServices.register(req.body);
        res.status(201).json({
            message: "user register successfully",
            userId: user._id,
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
};

const login = async (req,res) => {
    try{
        const {token, userId} = await authServices.login(req.body);
        res.status(200).json({
            message: "login successfully",
            userId,
            token,
        })

    }
    catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
};

module.exports = {register, login};