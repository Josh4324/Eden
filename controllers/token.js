const jwt = require("jsonwebtoken");
const {Response, Token } = require('../helpers');
const token = new Token();


exports.refreshToken = async (req, res) => {
    try {
        const {refreshToken} = req.body;

        const payload = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
        let newToken, newRefreshToken;

        const newPayload = {
            id : payload.id,
            role: payload.role
        }

        if (payload){
            newToken = await token.generateToken(newPayload,process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
            newRefreshToken = await token.generateToken(newPayload,process.env.REFRESH_JWT_SECRET, process.env.REFRESH_JWT_EXPIRES_IN);
        }
        
        const data = {
            token: newToken,
            refreshToken : newRefreshToken
        }
        const response = new Response(
            true,
            201,
            "Token refreshed",
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

