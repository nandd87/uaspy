const loginUser = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const findUser = await user.findOne({
            where: { username: username }
        });

        if (!findUser) {
            console.log("User not found");
            return res.status(401).send("User not found");
        }

        const isValid = await bcrypt.compare(password, findUser.password);

        if (!isValid) {
            console.log("Wrong password");
            return res.status(401).send("Wrong password");
        }

        const userId = findUser.username;

        const accessToken = jwt.sign({ user: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

        const refreshToken = jwt.sign({ user: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

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
                    username: decoded.user,
                    jwt: accessToken,
                },
            });

            if (!foundUser) {
                // User not found, send Forbidden status
                return res.sendStatus(403);
            }

            // User authenticated, send OK status
            return res.send({accessToken});
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
