const router = require('express').Router();
const User = require('../../models/User');

// Post request for creating a new user
router.post('/', async (req, res) => {
    try{
        const userData = await User.create(req.body);

        // Save the user data to the session and set their status for the session as logged in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    }catch(err){
        res.status(400).json(err);
    }
})

// Post request for logging user in
router.post('/login', async (req, res) => {
    try{
        // Find user in the database with an email that matches the request
        const userData = await User.findOne({ where: {email: req.body.email} });
        // If use is not found, return status code with json message
        if(!userData){
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }

        // Compare the password associated with the user in the database with the password in the request
        const validPassword = await userData.checkPassword(req.body.password);
        // If password does not match, return an error code
        if(!validPassword){
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    }catch(err){
        // If there is an error with the server, return status code with error
        res.status(400).json(err);
    }
})

// Post request for logging user out
router.post('/logout', async (req, res) => {
    if(req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end();
        });
    }else{
        res.status(404).end();
    }
})