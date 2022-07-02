import Footer from "./component/Footer";
import Home from "./component/Home";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import Register from "./component/Register";
import Write from "./component/Write";
import SinglePost from './component/SinglePost';
import Setting from "./component/Setting";
import NotFound from "./component/NotFound";
import {Route, Routes, Navigate, useLocation} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./services/authService";
import { ToastContainer } from 'react-toastify';
import Admin from "./component/Admin";

function App() {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <React.Fragment>
      <ToastContainer autoClose={2000} limit={2} theme='colored'/>
      {pathname !== '/not-found' && <Navbar user={user} />}
        <Routes>
          <Route exact path="/" element={<Home itemsPerPage={8} />} />
          <Route exact path="/posts" element={<Home itemsPerPage={8} />} />
          <Route path="/login" element={ user ? <Home itemsPerPage={8}/> : <Login/>} />
          <Route path="/register" element={user ? <Home itemsPerPage={8}/> : <Register />} />
        <Route path="/post/:id" element={<SinglePost user={user}/>}/>
          <Route path="/write" element={ user ? <Write /> : <Login/> } />
        <Route path="/settings" element={user ? <Setting user={user} /> : <Login />} />
        <Route path="/admin" element={user?.isAdmin ? <Admin /> : <NotFound />}/>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found"/>}/>
        </Routes>
      {pathname !== '/not-found' && <Footer/>}
    </React.Fragment>
  );
}

export default App;
