const express = require('express')

const router = express.Router()
const {getStatuses,addStatus,getMorePosts,removeStatus,editStatus} = require('./status.controller.js')

router.get('',getStatuses)
router.post('',addStatus)
router.get('/posts',getMorePosts)
router.delete('',removeStatus)
router.put('',editStatus)
module.exports = router