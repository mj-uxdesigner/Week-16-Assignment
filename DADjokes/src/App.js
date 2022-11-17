import React from 'react'
import Jokes from './pages/Jokes';
import Create from './pages/Create';
import GetJoke from './pages/GetJoke';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn'
import { theme } from './Theme/theme';
import Layout from './components/Layout'
import FireDataBase from './Firebase/fire';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { IconContext } from 'react-icons';



function App() {
  return (
    <ThemeProvider theme={theme}>
        <IconContext.Provider value={{ color: '#151e3d', size: '30px'}}>
            <Router>
                <Layout> 
                    <Routes>
                        <Route path='/' element={<GetJoke />}/>
                        <Route path='/create' element={<Create />}/>
                        <Route path='/yourjokes' element={<Jokes />}/>
                        <Route path='/signup' element={<SignUp />}/>
                        <Route path='/signin' element={<SignIn />}/>
                        <Route path='/fire' element={<FireDataBase />}/>
                    </Routes>
                </Layout>
            </Router>
        </IconContext.Provider>
    </ThemeProvider>
  );
}

export default App;
