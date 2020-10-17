import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () => {
    
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
        dispatch ( activeNote (doc.id, newNote));
        dispatch ( addNewNote (doc.id, newNote) );

    };
};

//setea la nota activa
export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

//baja de firebase las notas
export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch ( setNotes(notes));
    };
};


//actualiza toda la lista de notas
export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

//guarda en firebase la nota
export const startSaveNote = (note) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        if ( !note.url ) {
            delete note.url;
        }

        
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        
        dispatch ( refreshNote (note.id, noteToFirestore));
        Swal.fire('Saved', note.title, 'success');

    };
};

//esto actualiza una nota la lista de notas
export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            url: note.url,
            ...note
        }
    }
});

export const startUploading = (file) => {
    
    return async (dispatch, getState) => {
        
        const { active:activeNot} = getState().notes;

        Swal.fire( {
            title:'Uploading',
            text:'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: ()=> {
                Swal.showLoading()
            }
        });

        const fileUrl = await fileUpload ( file );
        activeNot.url = fileUrl;

        dispatch ( startSaveNote ( activeNot ) );
        //dispatch ( activeNote (activeNot.id, activeNot));
        Swal.close();

    };
};

export const startDelete = (id) => {
    
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        dispatch ( deleteNote ( id ) );
    };
};


export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const notesLogoutCleaning = () => ({
    type: types.notesLogoutCleaning
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
});