import { Schema, model } from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2';

const componentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    repoLink: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        required: false
    },
    category: {
        type: String,
        required: true,
        enum: ["button", "navbar", "card", "form", "layout", "navigation", "typography", "misc", "modal", "dropdown", "accordion", "carousel", "tab", "alert", "toast", "tooltip", "avatar", "badge", "breadcrumb", "pagination", "progress", "spinner", "table", "tag", "timeline", "sidebar", "footer", "header", "hero", "other"]
    },


    // Relationships
    submittedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    approvedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    }

}, { timestamps: true })

// Add pagination plugin to the schema
componentSchema.plugin(mongoosePaginate);

const Component = model("Component", componentSchema)
export default Component;