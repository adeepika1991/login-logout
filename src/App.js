import { GlobalStyle } from './GlobalStyles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Phone from './components/phone/Phone';
import Otp from './components/otp/Otp';
import Email from './components/email/Email';
import Profile from './components/profile/Profile';
import VerifyEmail from './components/verifyemail/VerifyEmail';
import SignUp from './components/signup/SignUp';
import AuthRoute from './routes/AuthRoute';


function App() {



  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Phone} />
          <Route exact path="/otp" component={Otp} />
          <Route exact path="/email" component={Email} />
          <Route exact path="/verifyemail" component={VerifyEmail} />
          <Route exact path="/signup" component={SignUp} />
          <AuthRoute exact path="/profile">
            <Profile />
          </AuthRoute>
          <Route path="*">
            <div>404 Not found </div>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
