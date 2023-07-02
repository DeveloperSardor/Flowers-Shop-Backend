import jwt from 'jsonwebtoken'
import config from 'config'

const JWT_SECRET = config.get('jwt_secret') as string;



export const JWT = {
    Sign (payload : any ){
       return jwt.sign({user_id : payload}, JWT_SECRET) 
    },
    Verify (token : any){
        return jwt.verify(token, JWT_SECRET )
    },
}