import jwt from 'jsonwebtoken'
function Authenticated(iComponents) {
    return(req, res) => {
        const {authorization} = req.headers
        if(!authorization){
            res.status(201).json({error : "You must login"})
        }
        try{
         let {userId} = jwt.verify(authorization, process.env.TOKEN_SECRET_KEY)
         req.userId = userId
         return iComponents(req, res)
        }
        catch(error){
            res.status(201).json({error : "You must login"})
        }
    }
}

export default Authenticated