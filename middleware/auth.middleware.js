const jwt = require("jsonwebtoken");  
function authenticateJwt(req, res, next) {
  const authHeader = req.header("Authorization");
  console.log(authHeader);

  const token = authHeader && authHeader.split(" ")[1]?.trim();
  console.log(token);console.log("VERIFY SECRET:", process.env.JWT_SECRET);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    // console.log("Verifying JWT with secret:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded JWT:", decoded);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(403).json({ message: "Forbidden" });
  }
}
module.exports = { authenticateJwt };
