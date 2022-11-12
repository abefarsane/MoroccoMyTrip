//middleware that we put inside router.post("/", MIDDLEWARE, (res, req))
// to check whether the token is valid or not
const {verify} =  require('jsonwebtoken')


const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken")

    if (!accessToken) {
        return res.json({error: "User not logged in."})
    } 

    try {
        const validToken = verify(accessToken, "secret-token-value")

        if(validToken) {
            return next()
        }
    } catch(err) {
        return res.json({error: err})
    }
}


module.exports = { validateToken }