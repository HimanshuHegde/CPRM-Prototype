import express from 'express'
import { tokensAdd, tokensDelete, tokensGet } from '../controller/tokens.controller.js'

const router = express.Router()

 router.get('/',tokensGet )
router.post('/',tokensAdd)
router.delete('/',tokensDelete)

export default router