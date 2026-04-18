import { Note } from "../models/notes.models.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import { ApiError } from "../utils/apiError.utils.js";  

//    controllers for create notes  (test complete ) 
export const createNote =asyncHandler(async (req, res) => {
    const { title, content, tags} = req.body;
    if(!title || !content){
        throw new ApiError(400,"Title and content are required")
    }   
    console.log("user id ",req.user._id)
    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      user: req.user._id,
    });

    res.status(201).json(new ApiResponse(201,note,"Note created successfully"))
})

//   controllers for get all notes (test complete)
export const getNotes =asyncHandler(async (req, res) => {

    const notes = await Note.find({ user: req.user._id ,isDeleted:false}).sort({
      isPinned: -1, 
      createdAt: -1,
    });
    res.status(200).json(new ApiResponse(200,notes,"Notes fetched successfully"))
});



//    controllers for get single note  (test complete )
export const getSingleNote =asyncHandler(async (req, res) => {
    const { id } = req.params;

    const note = await Note.findOne({
      _id: id,
      user: req.user._id,
      isDeleted:false
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json(new ApiResponse(200,note,"Note fetched successfully"))
});


//    controllers for update note  (test complete )
export const updateNote =asyncHandler(async (req, res) => {
    const { id } = req.params;
    const note = await Note.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id,
        isDeleted:false
      },
      req.body,
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

   return res.status(200).json(new ApiResponse(200,note,"Note updated successfully"))
  
});


//    controllers for delete note  (test complete )
export const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const note = await Note.findOneAndUpdate(
    {
      _id: id,
      user: req.user._id,
    },
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.status(200).json(new ApiResponse(200,note,"Note deleted successfully"));
});

export const trashNotes =asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id ,isDeleted:true}).sort({
      isPinned: -1, 
      createdAt: -1,
    });
    res.status(200).json(new ApiResponse(200,notes,"Notes fetched successfully"))
}); 

export const restoreNote =asyncHandler(async (req, res) => {
    const { id } = req.params;
    const note = await Note.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id,
      },
      {
        isDeleted: false,
      },
      {
        new: true,
      }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(new ApiResponse(200,note,"Note restored successfully"));
}); 

export const permanentDeleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const note = await Note.findOneAndDelete({
    _id: id,
    user: req.user._id,
    isDeleted: true
  });

  if (!note) {
    return res.status(404).json({ message: "Note not found in trash" });
  }

  res.status(200).json(new ApiResponse(200, note, "Note deleted permanently"));
});

export const togglePinned = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("id",id)

  // ✅ Step 1: Find note
  const note = await Note.findOne({
    _id: id,
    user: req.user._id,
  });

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  // ✅ Step 2: Toggle value
  note.isPinned = !note.isPinned;

  // ✅ Step 3: Save
  await note.save();

  res.status(200).json(
    new ApiResponse(200, note, "Note pin status updated successfully")
  );
});

