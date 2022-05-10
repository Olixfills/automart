import User from "../models/User-model";
import bcrypt from 'bcryptjs'

export const getAllUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find()
    } catch (err) {
        return console.log(err);
    }
    if (!users) {
        return res.status(404).json({message: 'No users found'})
    }

    return res.status(200).json({users: users});
}



export const signupUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const hashPass = bcrypt.hashSync(password)

    const user = new User({
        name,
        email,
        password: hashPass,
        blogs: []
    })
    try {
        await user.save()
    } catch (err) {
        return console.log(err.message);
    }
    return res.status(201).json({ user })
    
}

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({email})
    } catch (err) {
        console.log(err.message)
    }
    if (!existingUser) {
        return res.status(404).json({ message: "No such user, please sign up instead"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({message: "Incorrect Password"})
    }

    return res.status(200).json({message: "Login Successful"})

}