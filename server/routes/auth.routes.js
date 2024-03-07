const express=require('express');
const { signupController, loginController } = require('../controllers/auth.controllers');
//const {upload}=require("../middlewares/multer.middleware.js")
const multer=require('multer');
const { getAllPosts } = require('../controllers/post.controllers');
const storage = multer.diskStorage({
    destination: 'uploads/', 
    filename: (req, file, cb) => {
        console.log("8",file)
      cb(null, file.originalname);
    },
  });
const upload = multer({ storage,limits: { fileSize: 5 * 1024 * 1024 } });
const router=express.Router();


router.post('/singup',upload.single('profilePicture'),
signupController)
router.post('/login',loginController)
router.get('/posts',getAllPosts)

module.exports=router;