import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotesAppBar } from './NotesAppBar';
import { useForm } from "../../hooks/useForm";
import { activeNote, startDelete } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const {active:note } = useSelector(state => state.notes);
    
    const [formValues, handleInputChange, reset] = useForm(note);
    const { title, body } = formValues;

    //Toda esta negrada de abajo es para que se actualice cuando cambia de nota
    const activeId = useRef( note.id );

    useEffect(() => {
        if (note.id !== activeId.current ) {
            reset ( note );
            activeId.current = note.id;
        }
    }, [note, reset]);
    
    useEffect(() => {
        dispatch( activeNote (
            formValues.id, {
                    ...formValues
                }))
    }, [formValues, dispatch ]);

    const handleDelete = () => {
        dispatch ( startDelete (formValues.id));
    };

    return (
        <div className="notes__main-content">
            <NotesAppBar/>

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}

                />

                <textarea
                    placeholder="what happened today"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                >

                </textarea>

                {
                    (note.url) &&
                    (
                        <div className="notes__image">
                            <img 
                                src={note.url}
                                alt="imagen"/>
                        </div>
                    )
                }

            </div>

            <button 
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>

        </div>
    )
}
