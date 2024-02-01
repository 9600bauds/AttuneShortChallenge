import QuizzesTable from './QuizzesTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App container mt-4">
      <h1 className="mb-4 text-center">Welcome To The Quiz Zone</h1>
      <QuizzesTable />
    </div>
  );
}

export default App;
