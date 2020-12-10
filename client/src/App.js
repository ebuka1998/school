import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import StudentHomePage from './pages/StudentHomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AuthProtected from './utils/AuthProtected';
import AdminPage from './pages/AdminPage';
import AdminProtected from './utils/AdminProtected';
import SingleAssignmentPage from './pages/SingleAssignmentPage';
import UpdatePage from './components/adminComponents/UpdatePage';
import SingeAdminAnswerPage from './pages/SingeAdminAnswerPage';
import UpdateStudent from './pages/UpdateStudent';


function App() {
  return (
    <Router>
      <Switch>
        <AdminProtected exact path = '/' component={StudentHomePage}/>
        <Route exact path = '/admin' component={AdminPage}/>
        <Route exact path = '/answer/:id' component={SingeAdminAnswerPage}/>
        <AuthProtected exact path = '/register' component={RegisterPage}/>
        <AuthProtected exact path = '/login' component={LoginPage}/>
        <Route  path = '/:name/:id/update' component={UpdateStudent}/>
        <Route  path = '/assignment/:id' component={SingleAssignmentPage}/>
        <Route  path = '/update/:id' component={UpdatePage}/>
      </Switch>
    </Router>
  );
}

export default App;
