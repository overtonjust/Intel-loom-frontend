// Dependencies
import React from 'react';
import './InstructorView.scss';

// Components
import StudentCard from './components/studentCard';

const InstructorView = () => {
    return (
        <main className='lectures'>
            {/* Insert Class title w/ Date */}
            {/* Insert carosel component */}        
            <section className='lectures__students-grid'>
            {/* Map through students to make cards once data is received */}        
                <StudentCard/>
                <StudentCard/>
                <StudentCard/>
                <StudentCard/>
            </section>
        </main>
    );
};

export default InstructorView;