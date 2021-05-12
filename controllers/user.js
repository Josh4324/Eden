const UserService = require("../services/user");
const cloudinary = require("cloudinary").v2;
const {Response, Token } = require('../helpers');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

const userService = new UserService();
const token = new Token();


exports.signUp = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await userService.findUserWithEmail(email);
        if (user) {
            const response = new Response(
                true,
                409,
                "This user already exists",
              );
              res.status(response.code).json(response);
        }

        req.body.role = "user";
       
        const newUser = await userService.createUser(req.body);
      
        const payload = {
            id: newUser._id,
            role: newUser.role,
            email: newUser.email
        };
        const newToken = await token.generateToken(payload);
        
        const data = {
            id: newUser._id,
            token: newToken,
            role: newUser.role
        }
        const response = new Response(
            true,
            201,
            "User created successfully",
            data
          );
          res.status(response.code).json(response);
    } catch (err) {
        console.log(err);
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
          res.status(response.code).json(response);
    }
}

exports.logIn = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        const user = await userService.findUserWithEmailAndGetPassword(email);
        const checkPassword = await user.correctPassword(user.password, password);

        if (!user || !(checkPassword)) {
            const response = new Response(
                false,
                401,
                "Incorrect email or password",
              );
            res.status(response.code).json(response);
        }

        const payload = {
            id: user._id,
            role: user.role
        };
        const newToken = await token.generateToken(payload);

        const data = {
            id: user._id,
            token: newToken,
            role: user.role
        }
        const response = new Response(
            true,
            200,
            "User logged in Successfully",
            data
          );
        res.status(response.code).json(response);

    } catch (err) {
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
        res.status(response.code).json(response);
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const {id} = req.payload;
        
        const user = await userService.updateUser(id, req.body)

        const response = new Response(
            true,
            200,
            "User profile updated successfully",
            user
          );
        res.status(response.code).json(response);

    }catch (err){
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
        res.status(response.code).json(response);
    }
}

exports.getProfileData = async (req, res) => {
    try {
        const {id} = req.payload;

        const user = await userService.findUserWithId(id);

       const response = new Response(
            true,
            200,
            "Success",
            user
          );
        res.status(response.code).json(response);
        
    }catch(err){
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
        res.status(response.code).json(response);
    }
}