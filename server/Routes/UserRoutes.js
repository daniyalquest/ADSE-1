import express from 'express';
import User from '../Models/UserSchema.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post(
    '/users/register',
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
            // Hash the password before saving (you should use bcrypt or similar in production)
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

export default router;