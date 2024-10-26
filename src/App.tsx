import ToolBar from './Components/ToolBar/ToolBar';
import { Route, Routes } from 'react-router-dom';
import Home from './Containers/Home/Home.tsx';
import Add from './Containers/Add/Add.tsx';
import Edit from './Containers/Edit/Edit.tsx';
import './App.css';

const App = () => {

  return <>
    <ToolBar/>
    <div className="container m-5">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/quotes" element={<Home/>}/>
        <Route path="/quotes/:quoteCategory" element={<Home/>}/>
        <Route path="/quotes/new-quote" element={<Add/>}/>
        <Route path="/quotes/:quoteId/edit" element={<Edit/>}/>
        <Route path="*" element={<h4>Page not found</h4>}/>
      </Routes>
    </div>
  </>;
};

export default App;
