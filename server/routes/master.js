const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');           //password related
const jwt = require('jsonwebtoken');          //password related

const adminLayout = '../views/layouts/master';
const jwtSecret = process.env.JWT_SECRET;


/**
 * 
 * Check Login
*/
const authMiddleware = (req, res, next ) => {
  const token = req.cookies.token;

  if(!token) {
    return res.status(401).json( { message: 'Unauthorized'} );
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch(error) {
    res.status(401).json( { message: 'Unauthorized'} );
  }
}


/**
 * GET /
 * Admin - Login Page
*/
router.get('/master', async (req, res) => {
  try {
    const locals = {
      title: "Master",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    res.render('master/index', { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});


/**
 * POST /
 * Admin - Check Login
*/
router.post('/master', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne( { username } );

    if(!user) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const token = jwt.sign({ userId: user._id}, jwtSecret );
    res.cookie('token', token, { httpOnly: true });

    res.cookie('username', username);//for saving username
    res.redirect('/dashboard-m');

  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * Admin Dashboard
*/
router.get('/dashboard-m', authMiddleware, async (req, res) => {
  try {
    const locals = {
      username: req.cookies.username,
      title: 'Dashboard',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    }

    const data = await Post.find();
    res.render('master/dashboard-m', {
      locals,
      data,
      layout: adminLayout
    });

  } catch (error) {
    console.log(error);
  }

});





    router.get('/approve-post-m/:id', authMiddleware, async (req, res) => {
      try{

        const data = await Post.findById({ _id: req.params.id });


        console.log(data.body);
        s1=data.body;
        s1=s1+" summarize this";
        const s2 = s1;
        const axios = require('axios');

const options = {
  method: 'POST',
  
  headers: {
  },
  data: [
    {
      content: (String)(s2),
      role: 'user'
    }
  ]
};

try {
	const response = await axios.request(options);
	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }



      await Post.findByIdAndUpdate(req.params.id, {
        //Summary: response.data
        Summary: response.data.text,
        Approved: "yes"});
    // await Post.findByIdAndUpdate(req.params.id, {
    //   Summary: response.data,
    //   Approved: "yes"
    // });

    res.redirect(`/dashboard-m`);

  } catch (error) {
    console.log(error);
  }

} catch (error) {
	console.error(error);
}

});


// router.post('/admin', async (req, res) => {
//   try {
//     const { username, password } = req.body;
    
//     if(req.body.username === 'admin' && req.body.password === 'password') {
//       res.send('You are logged in.')
//     } else {
//       res.send('Wrong username or password');
//     }

//   } catch (error) {
//     console.log(error);
//   }
// });


/**
 * POST /
 * Admin - Register
*/
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password:hashedPassword });
      res.status(201).json({ message: 'User Created', user });
    } catch (error) {
      if(error.code === 11000) {
        res.status(409).json({ message: 'User already in use'});
      }
      res.status(500).json({ message: 'Internal server error'})
    }

  } catch (error) {
    console.log(error);
  }
});


/**
 * DELETE /
 * Admin - Delete Post
*/
router.delete('/delete-post-m/:id', authMiddleware, async (req, res) => {

  try {
    await Post.deleteOne( { _id: req.params.id } );
    res.redirect('/dashboard-m');
  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * Admin Logout
*/
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  //res.json({ message: 'Logout successful.'});
  res.redirect('/');
});


module.exports = router;
