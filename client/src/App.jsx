import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUser } from './actions/index';
import Header from './components/Header';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;


const App = ({ fetchUser }) => {

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route path='/surveys' element={<Dashboard />} />
          <Route path='/surveys/new' element={<SurveyNew />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default connect(null, { fetchUser })(App);
