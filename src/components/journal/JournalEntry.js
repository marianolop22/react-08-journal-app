import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ( {title, body, date, id, url} ) => {

    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch ( activeNote( id, {title, body, date, id, url}));
    };


    return (
        <div 
            className="journal__entry"
            onClick={handleOnClick}
        >
            
            {
                url && (
                    <div 
                        className="journal__entry-picture"
                        style={{
                            backgroundSize:'cover',
                            backgroundImage:`url(${url})`
                        }}    
                    >
                    </div>
                )
            }


            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ moment(date).format('dddd') }</span>
                <h4>{ moment(date).format('DD') }</h4>

            </div>

        </div>
    )
}
