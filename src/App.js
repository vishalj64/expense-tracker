import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowData from './Components/ShowData';
import ExpenseTracker from './Components/ExpenseTracker';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowData></ShowData>}></Route>
        <Route path='/add' element={<ExpenseTracker></ExpenseTracker>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
