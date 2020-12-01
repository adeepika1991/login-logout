import { GlobalStyle } from './GlobalStyles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Phone from './components/phone/Phone';
import Otp from './components/otp/Otp';
import Email from './components/email/Email';
import Profile from './components/profile/Profile';
import VerifyEmail from './components/verifyemail/VerifyEmail';
import SignUp from './components/signup/SignUp';


function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Route exact path="/" component={Phone} />
        <Route exact path="/otp" component={Otp} />
        <Route exact path="/email" component={Email} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/verifyemail" component={VerifyEmail} />
        <Route exact path="/signup" component={SignUp} />
      </Router>
    </div>
  );
}

export default App;
