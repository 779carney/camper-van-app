const mongoose = require("mongoose");
const User = require("../models/User");
const users = require ("../data/users");

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({ allUsers });
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ msg: "bad request" });
  }

  const userById = await User.findById(id);

  if (!userById) {
    return res.status(404).json({ error: "request not found" });
  }
  res.status(200).json(userById);
};
const getUserByUsername = (username) => {

 return users.users.find((user)=>user.username===username)
  };

const loginByUsername = async (req, res)=>{
  const { username, password } = req.body;
  const user = getUserByUsername(username);
  if (!user) {
    console.log('here ');
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  console.log(user);
  console.log({userP:user.password, pass:password});
  if (user.password !== password) {
    console.log('or herree');
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  return res.status(200).send({ message: 'Login successful', user:user });
};


// Get user by username
// const getUserByUsername = (username) => {
//   return users.find(user => user.username === username);
// };
// Login controller
// const login = (req, res) => {
//   const { username, password } = req.body;
  // Find user by username
//   const user = getUserByUsername(username);
//   // User not found
//   if (!user) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }
//   // Check password
//   if (user.password !== password) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }
//   // Login successful
//   return res.json({ message: 'Login successful' });
// // };
// module.exports = {
//   login
// };
const postUser = async (req, res) =>{
  const  {username,password,location,firstName,lastName,email,phoneNumber,img}=req.body;
  const newUser = new User({
    username:username,
    password:password,
    location:location,
    firstName:firstName,
    lastName:lastName,
    email:email,
    phoneNumber:phoneNumber,
    img:img
  })
  try {
        await newUser.save();
        res.status(201).json({
            newUser: newUser
           
        });
      } catch (error) {
      
          return res.status(400).send({msg:'invalid request'})
        }
      
}

const patchUser = async (req, res) => {
  try {
      const { id } = req.params;
      const updatedData = req.body

      if (!mongoose.isValidObjectId(id)) {
          return res.status(400).json({ msg: "bad request" });
      }
      if (Object.keys(updatedData).length === 0) {
          return res.status(400).send({ msg: 'missing required fields' })
      }

      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ msg: 'request not found' });
      }

      Object.assign(user, updatedData);

      const validationError = user.validateSync();
      if (validationError) {
          return res.status(400).json({ msg: 'invalid request' });
      }

      const updatedUser = await user.save();
      res.json({ updatedUser: updatedUser });


  } catch (error) {
      console.log(error);
  }
}

module.exports = { getUsers, getUserById, loginByUsername,postUser,patchUser};
