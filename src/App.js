import "./App.css";
import React, {useState} from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


 const App = () =>  {
   
  const APIKEY = process.env.REACT_APP_NEWS_API;
  const pageSize = 18;
  const country = "in";
  const  [progress, setProgress] = useState(0)
 
    return (
      <div>
        <LoadingBar color='#f11946' progress={progress}/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBar />}>            
              <Route exact index  path="/" element={<News setProgress = {setProgress}  country={country} key = "general" category="general" APIkey={APIKEY} pageSize={pageSize}/>}/>
              <Route exact  path="/science" element={<News setProgress = {setProgress}  country={country} key= "science" category="science" APIkey={APIKEY} pageSize={pageSize}/>}/>
              <Route exact  path="/business" element={<News setProgress = {setProgress}  country={country} key= "business" category="business" APIkey={APIKEY} pageSize={pageSize}/>}/>
              <Route exact  path="/entertainment" element={<News setProgress = {setProgress}  country={country} key= "entertainment" category="entertainment" APIkey={APIKEY} pageSize={pageSize}/>}/>
              <Route exact  path="/health" element={<News setProgress = {setProgress}  country={country} key= "health" category="health" APIkey={APIKEY} pageSize={pageSize}/>}/>
              <Route exact  path="/sports" element={<News setProgress = {setProgress}  country={country} key= "sports" category="sports" APIkey={APIKEY} pageSize={pageSize}/>}/>
              <Route exact  path="/technology" element={<News setProgress = {setProgress}  country={country} key= "technology" category="technology" APIkey={APIKEY} pageSize={pageSize}/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;