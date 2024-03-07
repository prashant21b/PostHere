const User=require('../models/user.models')
const {sendWelcomEmail}=require('../utils/sendMail')
const {uploadOnCloudinary}=require('../utils/cloudinary')
const jwt=require('jsonwebtoken')
exports.signupController = async (req, res) => {
    try {

        const { username, email, password, name} = req.body;
       //  console.log(req.body)

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

         
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User with email or username already exists' });
        }
        

        let profilePictureLocalPath;

        if (req.file) {
            profilePictureLocalPath = req.file.path.replace(/\s+/g, '')
        }
        console.log("28",profilePictureLocalPath)
       // const ProfilePicture = await uploadOnCloudinary(profilePictureLocalPath)
           // console.log(ProfilePicture)
        const newUser = new User({
            username,
            email,
            password,
            name: name || "",
           // profilePicture: ProfilePicture?.url || "",
           profilePicture:profilePictureLocalPath|| ""
        });
         await sendWelcomEmail(email);
     const savedUser=await newUser.save()
     savedUser.password=undefined;
    const token = jwt.sign(
        { userId:savedUser._id, email: savedUser.email,username:savedUser.username },
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } 
    );
        return res.status(201).json({ success: true, user: savedUser,token, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.loginController = async (req, res) => {
    try {
        // Extract email and password from the request body
        const { username,email,password} = req.body;
        console.log(req.body)
        if (!username && !email) {
            return res.status(404).json({ success: false, message: 'username and email are required feild' });
        }
        // Find the user by email
        const user = await User.findOne({email})
    

        // If the user does not exist, return an error
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await user.isPasswordCorrect(password)
        if(!isPasswordValid){
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token with appropriate payload and expiration time
        const token = jwt.sign(
            { userId: user._id, email: user.email,username:user.username },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } 
        );

       
        return res.status(200).json({ success: true, token, user: { email: user.email, name: user.name } });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
