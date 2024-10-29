// Dependencies
import { FloatingLabel, Form } from 'react-bootstrap';
import { UserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Prompt.scss'

const Prompt = ({ promptObj, setPrompt }) => {
    const {API, setMessage} = useContext(UserContext);
    const navigate = useNavigate();
    const { message, instructor, instructorId } = promptObj;
    const [isFormActive, setIsFormActive] = useState(false);
    const [reviewContent, setReviewContent] = useState({
      rating: 0,
      review: ''
    });
    const maxChar = 180;
    const { rating, review } = reviewContent;
    const remainingChars = maxChar - review.length;
    const handleSkip = () => {
      setPrompt(false)
      navigate('/')
    };
    const handleRadioChange = (e) => {
      setReviewContent(prev => ({
        ...prev, 
        rating: +e.target.value
      }))
    };

    const handleTextAreaChange = (e) => {
      const text = e.target.value;
      if(text.length <= maxChar) {
        setReviewContent(prev => ({
          ...prev,
          review: text
        }))
      }
    };

    const handleClear = () => {
      setReviewContent(prev => ({
        ...prev,
        review: ''
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(rating !== 0 || review.length !== 0) {
        await axios.post(`${API}/users/add-instructor-review`,
          { instructorId, review, rating },
          { withCredentials: true }
        )
        .then(res => setMessage("Thank you for the feedback!"))
        .catch(err => setMessage('Error submitting review'))
      }

      navigate('/')
    };

    return (
      <>
        {
          isFormActive ? 
          <Form className='prompt' onSubmit={handleSubmit}>
            <p className='prompt__message'>{`How would you rate ${instructor} out of 5?`}</p>
            <div className='prompt__radio'>
              <Form.Check
                inline
                label='1'
                className='prompt__radio-option'
                name='group1'
                type='radio'
                id='inline-radio-1'
                value={1}
                checked={rating === 1}
                onChange={handleRadioChange}
              />
              <Form.Check
                inline
                label='2'
                name='group1'
                className='prompt__radio-option'
                type='radio'
                id='inline-radio-2'
                value={2}
                checked={rating === 2}
                onChange={handleRadioChange}
              />
              <Form.Check
                inline
                label='3'
                name='group1'
                type='radio'
                id='inline-radio-3'
                value={3}
                checked={rating === 3}
                onChange={handleRadioChange}
              />
              <Form.Check
                inline
                label='4'
                name='group1'
                type='radio'
                id='inline-radio-4'
                value={4}
                checked={rating === 4}
                onChange={handleRadioChange}
              />
              <Form.Check
                inline
                label='5'
                name='group1'
                type='radio'
                id='inline-radio-5'
                value={5}
                checked={rating === 5}
                onChange={handleRadioChange}
              />
            </div>
            
            <FloatingLabel controlId='floatingTextarea' label='Place your review here'>
              <Form.Control
                as='textarea'
                placeholder='Place your review here'
                value={review}
                onChange={handleTextAreaChange}
                maxLength={maxChar}
              />
               {review.length >= 1 && 
                <button className='prompt__clear' onClick={handleClear}>clear</button>
              }
              <p className={`prompt__char-count ${remainingChars <= 50 && 'orange'} ${remainingChars === 0 && 'red'}`}>{remainingChars}</p>
            </FloatingLabel>
            <div className='prompt__options'>
              <button type='submit' className='button-orange' >Submit</button>
              <button className='prompt__skip' onClick={handleSkip}>Skip</button>
            </div>
          </Form>
          :
          <section className='prompt'>
            <p className='prompt__message'>{message}</p>
            <div className='prompt__options'>
              <button className='button-orange' onClick={() => setIsFormActive(true)}>Yes</button>
              <button className='prompt__skip' onClick={handleSkip}>Skip</button>
            </div>
          </section>
        }
      </>
    );
};

export default Prompt;