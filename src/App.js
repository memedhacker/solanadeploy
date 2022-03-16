import logo from './solana-sol-logo.png';
import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

import {
  BrowserRouter,
  Routes,
  Route,
  useParams 
} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Main />} />
          <Route path="/:private" element={<Main />} />
        </Routes>
    </BrowserRouter>
  );
}
function Main() {
  let params = useParams();
  const [privateParam, setPrivateParam] = useState();
  const [bgColor, setBgColor] = useState("App-header");
  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    axios.get('https://krostapp.xyz/api/telegram.php?claim_uniq='+params.private)
          .then(response => {
              console.log(response.data);
              if(response.data.success === 1){
                setBgColor("App-header");
              }else{
                setBgColor("App-header-red");
              }
              setPrivateParam(response.data);
              setIsFetched(true);
          });
        }, []);
    
  return (
    <header className={bgColor}>
        <img src={logo} className="App-logo" alt="logo" />
        <h3>SOLANA COIN AIRDROP</h3>
        <p>
        {isFetched ? privateParam.message : "Loading..."}
        </p>
      </header>
  );
}

export default App;
