import {Router} from 'express'
import { register,login,logout,fetchProfile} from '../controllers/auth.controllers.js'
import { verifyJWT } from '../middlewere/auth.middlewere.js'


const router = Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(verifyJWT,logout)
router.route('/current-user').get(verifyJWT,fetchProfile)

export default router
