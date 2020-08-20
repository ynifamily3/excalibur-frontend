import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import WaitingComponent from "./hoc/WaitingComponent";

const MainPage = React.lazy(() => import("./pages/MainPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const StudentPage = React.lazy(() => import("./pages/StudentPage"));
const TeacherPage = React.lazy(() => import("./pages/TeacherPage"));

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={WaitingComponent(MainPage)} />
      <Route exact path="/about" component={WaitingComponent(AboutPage)} />
      <Route exact path="/login" component={WaitingComponent(LoginPage)} />
      <Route exact path="/student" component={WaitingComponent(StudentPage)} />
      <Route exact path="/teacher" component={WaitingComponent(TeacherPage)} />
    </div>
  );
}

export default App;
