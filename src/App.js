import { GlobalStyle } from './GlobalStyles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Phone from './components/phone/Phone';
import Otp from './components/otp/Otp';
import Email from './components/email/Email';
import Profile from './components/profile/Profile';
import VerifyEmail from './components/verifyemail/VerifyEmail';
import SignUp from './components/signup/SignUp';
import AuthRoute from './routes/AuthRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <Phone toast={toast} />
          </Route>
          <Route exact path='/otp'>
            <Otp toast={toast} />
          </Route>
          <Route exact path="/email">
            <Email toast={toast} />
          </Route>
          <Route exact path="/verifyemail">
            <VerifyEmail toast={toast} />
          </Route>
          <Route exact path="/signup">
            <SignUp toast={toast} />
          </Route>
          <AuthRoute exact path="/profile">
            <Profile toast={toast} />
          </AuthRoute>
          <Route path="*">
            <div>404 Not found </div>
          </Route>

        </Switch>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </div>
  );
}

export default App;
