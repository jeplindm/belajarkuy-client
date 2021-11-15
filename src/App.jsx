import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import {
  LandingPage,
  Login,
  Register,
  NotFoundPage,
  Home,
  Analytics,
  UploadCourse,
  UploadAssessment,
  ManageCourse,
  EnrollCourse,
  StudentCourses,
  User,
} from "./pages";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <div className={classes.container}>
          <Sidebar />
          <Route exact path="/dashboard" render={(props) => <Home {...props} />} />
          <Route exact path="/analytics" render={(props) => <Analytics {...props} />} />
          <Route exact path="/users" render={(props) => <User {...props} />} />

          <Route
            exact
            path="/post/course"
            render={(props) => <UploadCourse {...props} />}
          />

          <Route
            exact
            path="/post/assessment"
            render={(props) => <UploadAssessment {...props} />}
          />

          <Route
            exact
            path="/manage/courses"
            render={(props) => <ManageCourse {...props} />}
          />

          <Route
            exact
            path="/enroll/course/:id"
            render={(props) => <EnrollCourse {...props} />}
          />

          <Route
            exact
            path="/enroll/courses/:id"
            render={(props) => <StudentCourses {...props} />}
          />
        </div>

        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
