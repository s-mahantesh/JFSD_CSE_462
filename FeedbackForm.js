import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit-feedback', {
        name,
        feedback
      });
      alert('Feedback submitted!');
      setName('');
      setFeedback('');
    } catch (err) {
      console.error(err); // for debugging
      alert('Error submitting feedback');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>Submit Feedback</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ padding: '10px', margin: '10px 0', width: '100%' }}
      />
      <textarea
        placeholder="Your Feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        required
        style={{ padding: '10px', margin: '10px 0', width: '100%' }}
      />
      <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
    </form>
  );
};

export default FeedbackForm;
