import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username: {
        type: String, required: true, unique: true, lowercase: true
    },
    fullName: {
        type: String, required: true,
    },
    email: {
        type: String, required: true, unique: true, lowercase: true
    },
    password: {
        type: String, required: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    emailVerificationToken: {
        type: String,
        default: null
    },
    emailVerificationExpires: {
        type: Date,
        default: null
    },

    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },

    // Profile customization
    avatarUrl: {
        type: String,
        default: "https://i.pinimg.com/736x/14/43/55/144355d7b36c5f646435423798281ce9.jpg"
    },
    bio: {
        type: String,
        maxlength: 250,
        default: ""
    },
    website: {
        type: String,
        default: ""
    },

    // Social Links
    github: {
        type: String,
        default: ""
    },
    linkedin: {
        type: String,
        default: ""
    },
    twitter: {
        type: String,
        default: ""
    },

    // Total Contributions
    totalContributions: {
        type: Number,
        default: 0
    },
    pendingSubmissions: {
        type: Number,
        default: 0
    },

    // For UI library role
    role: {
        type: String,
        enum: ["owner", "admin", "contributor", "user"],
        default: "user"
    },


}, { timestamps: true })

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    try {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS || 10))
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

// Method to verify password
userSchema.methods.verifyPassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password)
    } catch (error) {
        throw error
    }
}

// Method to generate access token with validity of 1 week
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        id: this._id,
        username: this.username,
        email: this.email,
        role: this.role,
        isVerified: this.isVerified
    }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
}


const User = model("User", userSchema)
export default User