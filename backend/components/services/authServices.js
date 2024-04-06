const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (userdata) => {
    try{
        const existingUser = await User.findOne({email:userdata.email});
        if(existingUser){
            throw new Error("user already exist");
        }
        const user = new User(userdata);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);

        user.password = hashPassword;
        user.save();

        return user;
    } 
    catch(error){
        throw error;
    }
};

const login = async (userData) => {
    try{
        const {email, password} = userData;
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("user not found");
        }

        const match = await user.comparePassword(password);

        if(!match){
            throw new Error("password is incorrect");
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        return {token, user};

    }
    catch(error){
        throw error;
    }
};

module.exports = {register, login};


// {
//     "message": "user register successfully",
//     "userId": "65f46f1906d129916d4c628b"
// }


// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjQ2ZjE5MDZkMTI5OTE2ZDRjNjI4YiIsImlhdCI6MTcxMDUxODA3OH0.4hdqvBCK1IxPSsw1nj0zU8G1io2b_FEchoZnaDBzrS4"


// {
//     "title": "movie1",
//     "director": "director1",
//     "genre": "genre1",
//     "releaseYear": 1999,
//     "description": "description1",
//     "_id": "65f697176ca64b29ad432a04",
//     "createdAt": "2024-03-17T07:09:11.025Z",
//     "updatedAt": "2024-03-17T07:09:11.025Z",
//     "__v": 0
// }