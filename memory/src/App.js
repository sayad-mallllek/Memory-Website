import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import ActivityPage from './Components/ActivityPage';

function App() {
  console.log("starting App");
  return (
    <div className="App">
      <ActivityPage />
    </div>
  );
}

export default App;
