import {createSlice} from "@reduxjs/toolkit";
import {fetchNotes,createNote,updateNote,deleteNote,pinNote,fetchTrashNotes,fetchPinNotes,restoreNote,permanentDeleteNote} from '../Api/Apicall'

const initialState={
    notes:[],
    trashNotes:[],
    pinNotes:[],
    loading:false,
    error:null
}
const noteSlice = createSlice({
    name:"notes",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchNotes.fulfilled,(state,action)=>{
            state.notes=action.payload.data
            state.loading=false
        })
        .addCase(createNote.fulfilled,(state,action)=>{
            state.notes.push(action.payload.data)
            state.loading=false
        })
        .addCase(updateNote.fulfilled,(state,action)=>{
            state.notes=state.notes.map((note)=>note._id===action.payload.data._id?action.payload.data:note)
            state.loading=false
        })
        .addCase(deleteNote.fulfilled,(state,action)=>{
            state.notes=state.notes.filter((note)=>note._id!==action.payload.data._id)
            state.trashNotes.push(action.payload.data)
            state.loading=false
        })
        .addCase(permanentDeleteNote.fulfilled,(state,action)=>{
            state.trashNotes=state.trashNotes.filter((note)=>note._id!==action.payload.data._id)
            state.loading=false
        })
        .addCase(pinNote.fulfilled,(state,action)=>{
            state.notes=state.notes.map((note)=>note._id===action.payload.data._id?action.payload.data:note)
            state.loading=false
        })
        .addCase(fetchTrashNotes.fulfilled,(state,action)=>{
            state.trashNotes=action.payload.data
            state.loading=false
        })
        .addCase(fetchPinNotes.fulfilled,(state,action)=>{
            state.pinNotes=action.payload.data
            state.loading=false
        })
        .addCase(restoreNote.fulfilled,(state,action)=>{
            state.trashNotes=state.trashNotes.filter((note)=>note._id!==action.payload.data._id)
            state.notes.push(action.payload.data)
            state.loading=false
        })
    }
})

export default noteSlice.reducer