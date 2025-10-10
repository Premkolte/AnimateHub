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
        enum: ["button", "input", "checkbox", "radio", "select", "switch", "form", "date picker", "navbar", "sidebar", "tabs", "breadcrumb", "pagination", "grid", "container", "spacing", "divider", "table", "card", "accordion", "tooltip", "modal", "alert", "badge", "avatar", "toast", "progress", "spinner", "skeleton", "drawer", "popover", "icons", "transitions", "animations", "layout", "navigation", "typography", "dropdown", "carousel", "tab", "tag", "timeline", "footer", "header", "hero"]
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