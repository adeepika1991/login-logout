import { GlobalStyle } from './GlobalStyles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Phone from './components/phone/Phone'


function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Route exact path="/" component={Phone} />
      </Router>
    </div>
  );
}

export default App;
