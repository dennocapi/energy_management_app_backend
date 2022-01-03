const bcrypt = require('bcryptjs')
const {
    registerValidation,
    loginValidation
} = require('../validations/validation')
const User = require('../models/usersModel')
const {
    signJWT
} = require('../utils/jwt.utils')
const {
    createSession,
    invalidateSession
} = require("../db/index.js")

exports.register = async (req, res) => {
    try {

        await registerValidation.validateAsync(req.body)
        const {
            email,
            password,
            companyName,
            location,
            emailVerified
        } = req.body

        // Check if a user is already in the database

        const emailExists = await User.findOne({
            email: email
        })

        if (emailExists) return res.status(400).json({
            message: 'This email is already taken'
        })

        // Hash passwords
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create a new user
        const user = new User({
            email: email.toLowerCase(),
            password: hashedPassword,
            companyName: companyName,
            location: location,
            emailVerified: emailVerified

        })
        await user.save()
        const {
            status,
            _id,
            image
        } = user
        const session = createSession({
            email,
            companyName,
            emailVerified,
            status,
            _id,
            image
        })
        const accessToken = signJWT({
            _id: _id,
            companyName: companyName,
            email: email,
            location: location,
            session: session.sessionId
        }, "30d")
        const refreshToken = signJWT({
            session: session.sessionId
        }, "1y")

        // set access token in cookie
        res.cookie("accessToken", accessToken, {
            maxAge: 2.678e+12, // 31 days
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV !== 'development'
        });

        // refresh token cookie
        res.cookie("refreshToken", refreshToken, {
            maxAge: 3.154e10, // 1 year
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV !== 'development'

        })

        return res.status(200).send(session)

    } catch (err) {
        console.log(err.toString())
        if (err.isJoi === true) {
            err.status = 422
            return res.status(422).json({
                message: err.toString()
            })
        }
        return res.status(400).json({
            status: 'failed',
            message: 'Registration failed'
        })
    }
}

exports.login = async (req, res) => {
    try {
        await loginValidation.validateAsync(req.body)
        const {
            email,
            password
        } = req.body

        // Check if the email exists
        const user = await User.findOne({
            email: email.toLowerCase()
        })
        if (!user) return res.status(400).json({
            message: 'Wrong email or password.'
        })

        // Check if the password is correct
        const validPass = await bcrypt.compare(password, user.password)
        if (!validPass) return res.status(400).json({
            message: 'Wrong email or password.'
        })
        const {
            location,
            emailVerified,
            companyName,
            status,
            _id,
            image
        } = user
        const session = createSession({
            email,
            companyName,
            location,
            emailVerified,
            status,
            _id,
            image
        })
        const accessToken = signJWT({
            _id: _id,
            email: email,
            sessionId: session.sessionId
        }, "30d")
        const refreshToken = signJWT({
            sessionId: session.sessionId
        }, "1y")
        console.log(accessToken)

        // set access token in cookie
        res.cookie("accessToken", accessToken, {
            maxAge: 2.678e+12, // 31 days
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV !== 'development'
        });

        // refresh token cookie
        res.cookie("refreshToken", refreshToken, {
            maxAge: 3.154e10, // 1 year
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV !== 'development'
        })

        return res.status(200).send(session)
    } catch (err) {
        console.log(err.toString())
        if (err.isJoi === true) {
            err.status = 422
            return res.status(422).json({
                message: err.toString()
            })
        }
        return res.status(400).json({
            message: 'Login failed'
        })
    }

}

exports.getSession = async (req, res) => {
    const userExists = await User.findOne({
        _id: req.user._id
    })
    const {
        email,
        companyName,
        location,
        emailVerified,
        status,
        _id,
        image
    } = userExists
    const session = createSession({
        email,
        companyName,
        location,
        emailVerified,
        status,
        _id,
        image
    })
    return res.send(session);
}

exports.logout = async (req, res) => {

    res.cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV !== 'development'
    })

    res.cookie("refreshToken", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV !== 'development'

    })

    invalidateSession(req.user.sessionId)

    return res.status(200).json({
        success: true
    })
}