import jwt from 'jsonwebtoken'
export default (iComponents) => {
    return (req, res) => {
      try {
        const { authorization } = req.headers;
        if (!authorization) {
          res.status(201).json({ error: "Must be Login" });
        }
        const {userId} =  jwt.verify(authorization, process.env.TOKEN_SECRET_KEY) 
           req.userId = userId
        return iComponents(req, res)
      } catch (error) {
        res.status(201).json({ error: "Must be Login" });
      }
    };
  }