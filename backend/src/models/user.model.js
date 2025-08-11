import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"

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
        type: Boolean, deafult: false
    },

    // For UI library role
    role: {
        type: String,
        enum: ["user", "contributor", "admin"],
        default: "user"
    },

    // Profile customization
    avatarUrl: {
        type: String
    },
    bio: {
        type: String,
        maxlength: 250
    },
    website: {
        type: String
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

const User = model("User", userSchema)
export default User