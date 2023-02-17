const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {

    // Get the refresh-token in cookie
    const cookies = req.cookies;
    
    if (!cookies?.jwt) {
        console.log(401);
        return res.sendStatus(401);
    }

    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    // Find the user with the refresh-token
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    if (!foundUser) {
        return res.sendStatus(403); // Unauthorized
    }

    /*
        Note: when the refresh-token is created, 
        we have also include (i.e. encode) the json object { "username": value } in it.
    */

    // So when we supply the refresh-token into jwt.verify
    // the method will decode and return the json object { "username": value } for us to verify
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) {
                return res.sendStatus(403);
            }

            const roles = Object.values(foundUser.roles);

            
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }   
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );

            // if the refresh-token is valid, retuen a new access-token
            res.json({ accessToken })

        }
    )

}

module.exports = {
    handleRefreshToken    
}