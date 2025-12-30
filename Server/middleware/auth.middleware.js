
// // ********************//middleware***************
// // What is Middleware?
// // Middleware is literally code that sits in the middle of an incoming Request and the final Response.
// // When a user clicks a button on the frontend, the request travels to your server. Before it reaches the final logic (like "Delete Task"), it passes through several "checkpoints." These checkpoints are your middlewares.

// // Why is it used? (Real-world Scenarios)
// // Authentication 
// // Logging
// // Error Handlingconst 
// jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded; // { id }

//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;


jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    
    res.status(401).json({ 
      message: "Invalid token", 
      reason: error.message // Send the reason to Postman for debugging
    });
  }
};
module.exports = authMiddleware;