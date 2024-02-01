const QuizItem = ({ quiz }) => {
  return (
    <tr>
      <td>{quiz.name}</td>
      <td>{quiz.description}</td>
      <td>{quiz.active ? 'Yes' : 'No'}</td>
    </tr>
  );
};

export default QuizItem;
