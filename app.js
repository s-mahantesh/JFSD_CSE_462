import React from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Student Feedback Portal</h1>
      <FeedbackForm />
      <FeedbackList />
    </div>
  );
}

export default App;
