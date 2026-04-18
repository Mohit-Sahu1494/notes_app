import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 100,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isPinned: {
      type: Boolean,
      default: false,
    },
    isDeleted:{
        type: Boolean,
        default: false,
    },
    tags: {
      type: [String],
      default: [],
    }
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);