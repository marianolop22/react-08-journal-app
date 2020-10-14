import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry">
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize:'cover',
                    backgroundImage:'url(https://www.gettyimages.es/gi-resources/images/500px/983801190.jpg)'
                }}    
            >
            </div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo día
                </p>
                <p className="journal__entry-content">
                    Elit ut ea adipisicing eu eiusmod est officia. Velit culpa elit nulla sint 
                </p>


            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>

            </div>

        </div>
    )
}
