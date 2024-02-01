import { useState, useEffect } from 'react';
import axios from 'axios';
import QuizItem from './QuizItem';

const POLL_INTERVAL = 3000; // 3 seconds

const QuizzesTable = () => {
  const [quizzes, setQuizzes] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/api/quizzes');
        setQuizzes(response.data.quizzes);
      } catch (err) {
        // Display error in a popup for now, probably handle this more gracefully later
        alert(`Error loading quizzes: ${err.message}`);
      }
    };

    fetchQuizzes();
    const interval = setInterval(fetchQuizzes, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  if (!quizzes) return <p>Loading quizzes...</p>; // Check if quizzes is null

  return (
    <div className="container mt-4">
      <h2>Quizzes</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map(quiz => (
            <QuizItem key={quiz.id} quiz={quiz} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizzesTable;
