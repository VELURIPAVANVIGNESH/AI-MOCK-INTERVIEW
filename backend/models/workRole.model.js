import mongoose from "mongoose";

const workRoleSchema = new mongoose.Schema({
    authenticate : {
        type: String,
        required: true,
    },
    workerRole : {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    bestScore : {
        type : Number,
        default:0,
    }
}, { timestamps: true });

const workRoleModel = mongoose.model("workRole", workRoleSchema);
export default workRoleModel;