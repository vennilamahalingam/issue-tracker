import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import { makeStyles } from "@material-ui/core";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Ticket from "./pages/Ticket";
import Project from "./pages/Project";
import ProjectList from "./pages/ProjectList";
import UserRoleManagement from "./pages/UserRoleManagement";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TicketList from "./pages/TicketList";
import GridTemplate from "./components/GridTemplate";
import { useDispatch } from "react-redux";
import { updateUser } from "./actions";
import ForgotPassword from "./pages/ForgotPassword";
import axios from "axios";



const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isMounted = useRef(true);

  useEffect(()=>{
    const authToken = localStorage.getItem("token");
    if(authToken)
    {
        axios.get("http://localhost:3000/auth/me",{headers: {'Authorization' : authToken}}).then(({data})=>{
          const {name, email, role, _id} = data;
            dispatch(updateUser({
              displayName: name,
              email: email,
              'role': role,
              id: _id
          }));
        })
    }
  },[]);
  return (
      <>
        <Router>
          <Routes>
                <Route path='/profile/*'>
                    <Route path="signin" element={<SignIn/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route path="forgotPassword" element={<ForgotPassword/>}/>
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path='/' element={<GridTemplate/>}>
                      <Route path="/" element={<Dashboard/>}/>
                      <Route path="/userrole" element={<UserRoleManagement/>}/>
                      <Route path="/projects" element={<ProjectList/>}/>
                      <Route path="/projects/:projectid" element={<Project/>}/>
                      <Route path="/tickets/:ticketId" element={<Ticket/>}/>
                      <Route path="/tickets" element={<TicketList/>}/>
                    </Route>
                </Route>
                </Routes>
        </Router>
      </>
  );
};

export default App;
