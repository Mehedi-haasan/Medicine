const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");



isPublicUser = async (req, res, next) => {
    let authorization = req.headers["authorization"];
    let token = authorization && authorization.split(" ")[1];

    if (!token) {
        // get public user and set
        req.partnerId = PUBLIC_USER_ID;
        req.publicUser = true;
        next();
        return;
    }

    jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
            // get public user and set
            req.partnerId = PUBLIC_USER_ID;
            req.publicUser = true;
            next();
            return;
        }
        const user = await User.findByPk(decoded.id);
        if (!user || user && !user.active) {
            // get public user and set
            req.partnerId = PUBLIC_USER_ID;
            req.publicUser = true;
            next();
            return;
        }

        req.userId = decoded.id;
        req.partnerId = decoded.partnerId;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                success: false,
                message: "Permission Denied!"
            });
        });
    });
};

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                success: false,
                message: "Permission Denied!"
            });
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }

                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                success: false,
                message: "Permission Denied!"
            });
        });
    });
};




verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      // Attach the decoded user information to the request for further use
      req.user = decoded;
  
      // Continue to the next middleware or route
      next();
    });
  };



const authJwt = {
    verifyToken: verifyToken,
    isPublicUser: isPublicUser,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;