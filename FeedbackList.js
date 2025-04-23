import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/feedbacks');
        setFeedbacks(res.data);
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Feedbacks Received</h2>
      {feedbacks.map((fb, idx) => (
        <div key={idx} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
          <h4>{fb.name}</h4>
          <p>{fb.feedback}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
