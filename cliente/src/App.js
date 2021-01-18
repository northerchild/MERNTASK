import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Login } from './components/auth/Login';
import { NuevaCuenta } from './components/auth/NuevaCuenta';
import { Proyectos } from './components/proyectos/Proyectos';
import ProyectoState from './context/proyectos/ProyectoState';
import TareasState from './context/tareas/TareasState';
import AlertaState from './context/alerta/alertaState';
import AuthState from './context/auth/authState';

function App() {
  return (
    <ProyectoState>
      <TareasState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/nueva-cuenta" component={NuevaCuenta}/>
                <Route exact path="/proyectos" component={Proyectos}/>
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareasState>
    </ProyectoState>
  );
}

export default App;
