import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import MainPage from "./containers/MainPage/MainPage";
import SignUp from "./containers/SignUp/SignUp";
import SingIn from "./containers/SignIn/SignIn";
import ButtonAppBar from "./components/UI/AppBar/AppBar";
import {useSelector} from "react-redux";

const App = () => {
  const user = useSelector(state => state?.activeUsers.loginUser);


  const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
      <Route {...props}/> :
      <Redirect to={redirectTo}/>
  };

  return (
    <BrowserRouter>
      <ButtonAppBar/>
      <Switch>
        <ProtectedRoute
          isAllowed={user.token}
          path="/" exact
          component={MainPage}
          redirectTo='/login'
        />
        <Route path='/register' component={SignUp}/>
        <Route path='/login' component={SingIn}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
