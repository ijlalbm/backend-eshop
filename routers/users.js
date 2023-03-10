const express = require('express');
const { User } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res)=>{
    const userList = await User.find().select('-passwordHash');

    if(!userList) {
        res.status(500).json({success: false});
    }
    res.send(userList);
});

router.get('/:id', async (req,res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash');;
    if (!user) {
        res.status(500).json({'message': 'The user with given ID was not found!'})
    }
    res.status(200).send(user);
})

router.post(`/`, async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        color: req.body.color,
        passwordHash: bcrypt.hashSync(req.body.password),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartmen: req.body.apartmen,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    });
    user = await user.save();

    if(!user){
        return res.statusCode(404).send('the user cannot be created!')
    }
    res.send(user);
})

router.post('/login', async(req,res)=>{
    const user = await User.findOne({
        email: req.body.email,
    });

    if (!user) {
        return res.status(400).send('The user not found');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const secret = process.env.secret;
        const token = jwt.sign({
            userId: user.id,
            isAdmin: user.isAdmin,
        }, secret, {
            expiresIn: '1d',
        });

        res.status(200).send({
            'email': user.email,
            'token': token,
        });
    } else {
        res.status(400).send('password is wrong!');
    }
});

router.get(`/get/count`, async (req,res)=>{
    const userCount = await User.countDocuments();

    if(!userCount) {
        res.status(500).json({success: false})
    }
    
    res.send({
        userCount: userCount
    });
});

router.delete(`/:id`, (req,res)=>{
    User.findByIdAndRemove(req.params.id).then(user=>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(400).json({
                success: false,
                message: "User cannot be deleted!",
            })
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err});
    })
})

module.exports = router;