import express from 'express';
import User from '../Models/UserSchema.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in user routes:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('role').notEmpty().withMessage('Role is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, password, role } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({ name, email, password: hashedPassword, role });
            await newUser.save();

            console.log('New user created:', newUser);

            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.error('Error creating user:', error.message);
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    }
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            console.log('User logged in:', user);

            res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            console.error('Error logging in:', error.message);
            res.status(500).json({ message: 'Error logging in', error: error.message });
        }
    }
);

export default router;

// This file defines routes for user registration and login.
// The '/users/register' route handles user registration, including validation, password hashing, and saving the user to the database.
// The '/users/login' route handles user login, including validation, password comparison, and returning the user data upon successful login.
// Both routes use express-validator for input validation and bcrypt for password hashing and comparison.
// Errors are handled and appropriate responses are sent back to the client.
