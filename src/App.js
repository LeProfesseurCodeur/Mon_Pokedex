import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'; /*serveur qui sert uniquement les fichiers statiques */
/*
  <HashRouter> utilise le hash de l'url pour tout mémoriser. 
  <BrowserRouter> utilise le History API (inclus dans HTML 5) pour surveiller l'hsitorique du router
*/
import 'bootstrap/dist/css/bootstrap.min.css'; /*Importation bootstrap*/
import './App.css'; /*Importation CSS*/
import NavBar from "./components/layout/NavBar" /*Import du fichier Navbar.js*/
import Dashboard from './components/layout/Dashboard'; // Import page d'acceuil
import Pokemon from './components/pokemon/Pokemon'; // Import des Pokemon et des infos suivies 
import backgroundImage from './pattern.png'; // Import background 

class App extends Component {
  render() {
    return (
      <Router> 
        <div className="App" style={{ background: `url(${backgroundImage})`}} /** Arrière plan de couleur blanc */>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} /> 
              <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} /> 
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;

// Router : rend l'interface de l'application synchrone avec l' URL du navigateur. 
// React Router permet de router clairement le "flux de données" (data flow) dans notre application. 
// Cela équivaut à une affirmation. Si nous avons cette URL, elle sera équivalente à cette Route et l'interface sera 
// comme suit.  

// Route : Le composant <Route> définit une relation entre une URL et un Component. 
// Cela signifie que lorsque l'utilisateur visite une URL sur le navigateur, un Component correspondant doit être 
// rendu sur l'interface.    