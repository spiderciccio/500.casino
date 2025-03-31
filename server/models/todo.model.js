import mongoose from "mongoose";

const TodoSchema = mongoose.Schema({
  text: {
    type: String, 
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

export default mongoose.model("Todo", TodoSchema);