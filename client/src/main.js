import {Routes,Route} from 'react-router-dom';
import App from './App';
import InscriptionPage from './pages/Inscription.jsx';
import LoginPage from './pages/Login.jsx';
import MembersArea from './members/App';
import RequireAuth from './components/RequireAuth';
import './members/index.css';
import ComingSoonPage from './pages/ComingSoon.jsx';

function Main() {

  return (
    <Routes>
  <Route path='/' element={<App />} />
  <Route path='/inscription' element={<InscriptionPage />} />
  <Route path='/connexion' element={<LoginPage />} />
  <Route path='/soon' element={<ComingSoonPage />} />
  <Route path='/members/*' element={<RequireAuth><MembersArea /></RequireAuth>} />
    </Routes>
  )
}

export default Main
