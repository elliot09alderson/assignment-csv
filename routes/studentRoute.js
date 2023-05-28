import express from 'express'

const student = express()
import getAllStudent from '../controllers/student.js'
export const studentRouter  =  express.Router()

studentRouter.route('/all').get(getAllStudent)

