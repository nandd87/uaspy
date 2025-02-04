const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require('../models/').user;
const dotenv = require("dotenv");
const { text } = require("express");

dotenv.config(); // Load environment variables from .env file

const getUser = async(req, res) => {
        const allUser = await user.findAll({})
        res.send(allUser)
};

const createUser = async(req, res) => {
    const saltRounds = 10;
    try {

        const username = req.body.username
        const password = req.body.password


        const salt = await bcrypt.genSaltSync(saltRounds);
        const hashpass = await bcrypt.hash(password, salt);

        console.log(username)
        console.log(hashpass)

        
            await user.create({
                username: username,
                password: hashpass,
                role: "admin",
                status: 1,
            });
            res.send("SUKSES");
        }catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
};


const loginUser = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const findUser = await user.findOne({
            where: { username: username }
        });

        if (!findUser) {
            console.log("User not found");
            return res.status(401).json({ error: "User not found" });
        }

        const isValid = await bcrypt.compare(password, findUser.password);

        if (!isValid) {
            console.log("Wrong password");
            return res.status(401).json({ error: "Wrong password" });
        }

        const userId = findUser.id;
        const uname = findUser.username;
        const role = findUser.role;

        const accessToken = jwt.sign({ id: userId , name : uname , role :role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

        const refreshToken = jwt.sign({ id: userId, name : uname, role : role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

        await findUser.update({ jwt: refreshToken }, {
            where: {
                id: userId
            }
        });

        res.cookie("token", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: false,
            samesite: "None",
            domain: 'localhost',
            path: '/',
        });
        res.json({ accessToken });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


const shopLogout = async(req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).send("Token not found");

        console.log(token)
        
        const findUser = await user.findOne({
            where: {
                jwt: token,
            },
        });

        console.log(token)
        if (!findUser) {
            return res.status(401).send("User not found");
        }

        await findUser.update({ jwt: null }, {
            where: {
                id: findUser.id,
            },
        });
        res.clearCookie("token");
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

const isLogin = async (req, res) => {
    try {
        const accessToken = req.cookies.token;

        if (!accessToken) {
            // No token provided, send Unauthorized status
            return res.sendStatus(401);
        }

        const env = "ondsf0sgd3qirjg6";

        try {
            // Verify and decode the access token
            const decoded = jwt.verify(accessToken, env);

            // Find the user based on the decoded user ID and token
            const foundUser = await user.findOne({
                where: {
                    username: decoded.name,
                    jwt: accessToken,
                },
            });

            if (!foundUser) {
                // User not found, send Forbidden status
                return res.sendStatus(403);
            }

            // User authenticated, send OK status
            const return1 = decoded.name
            const role = decoded.role

            return res.send({return1,role,accessToken});
        } catch (error) {
            // Token verification failed, send Forbidden status
            console.error(error);
            return res.sendStatus(403);
        }
    } catch (error) {
        // Internal server error
        console.error(error);
        return res.sendStatus(500);
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id

        await user.update({
            status : 0,
        },
        {
            where: {
                id:id
            }
        }
        )

        res.send("sukses")
    } catch (error) {
        res.send("akun terdapat pada transaksi!")
    }
};

module.exports = deleteUser;




module.exports = {
    createUser,
    getUser,
    loginUser,
    shopLogout,
    isLogin,
    deleteUser
};