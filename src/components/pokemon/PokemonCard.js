import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Fournit une navigation déclarative et accessible autour de notre application.
                                        //  Il permet aussi de remplacer a href par Link to
import styled from 'styled-components';
import spinner from '../layout/Spinner-1s-200px.gif'; // spinner gif 

// Style Sprite gif via styled-component
const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

// Style card menu
const Card = styled.div`
  opacity: 0.95;
`;

//Style des liens
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class PokemonCard extends Component {
  state = { // state est l'endroit d'où proviennent les données. 
    name: '',
    imageUrl: '',
    pokemonIndex: '',
    imageLoading: true,
    toManyRequests: false
  };

  componentDidMount() { // méthode est appelée une fois que tous les éléments de la page sont rendus correctement. 
                        // Une fois le balisage défini sur la page. Cette méthode est appelée par React lui-même, 
                        // soit pour récupérer les données depuis une API externe, soit pour effectuer des opérations uniques 
                        // qui nécessitent des éléments JS.

                        // La méthode componentDidMount() est l'endroit parfait pour appeler la méthode setState() afin de changer 
                        // l'état de l'application tandis que render() se charge des données JSX mise à jour => affichage. 

    const { name, url } = this.props; //this.props = contient les props définis par l'appelant de ce composant. 
    const pokemonIndex = url.split('/')[url.split('/').length - 2]; // url.split = coupe l'url et prend l'avant dernier 
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    this.setState({ name, imageUrl, pokemonIndex }); //this.setState envoie une série de modification à l'état local du composant afin d'être mis à jour. 
  }

  render() { // render est une méthode requise dans un composant de classe. Quand elle est appelé, elle doit examiner this.props et this.state...

            // render() est la méthode la plus utilisée pour tout composant alimenté par React qui retourne un JSX avec des données back-end. 
            // La fonction render() est considérée comme une fonction normale mais en réalité elle doit toujours retourner quelque chose. 
            // Lorsque le fichier composant est appelé, il appelle par défaut la méthode render() parce que ce composant doit afficher 
            // le balisage HTML (qu'on peut qualifier de syntaxe JSX).

    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`pokemon/${this.state.pokemonIndex}`}> {/* Navigation et url + nom pokémon */}
          <Card className="card">
            <h5 className="card-header">{this.state.pokemonIndex}</h5> {/* Header card, soit le numéro de chaque card */}
            
            {/* Spinner */}
            {this.state.imageLoading ? (
              <img src={spinner} style={{ width: '5em', height: '5em' }} className="card-img-top rounded mx-auto d-block mt-2"/> // Construction spinner chargement image
            ) : null}

            {/* Chargemment des card pokemon avec spinner sinon error */}
            <Sprite
              className="card-img-top rounded mx-auto mt-2"
              src={this.state.imageUrl}
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ toManyRequests: true })}
              style={
                this.state.toManyRequests
                  ? { display: 'none' }
                  : this.state.imageLoading
                  ? null
                  : { display: 'block' }
              }
            />

            {/* To Many Request = mauvais signe */}

            {this.state.toManyRequests ? (
              <h6 className="mx-auto">
                <span className="badge badge-danger mt-2">
                  To Many Requests
                </span>
              </h6>
            ) : null}
           
            <div className="card-body mx-auto">
              <h6 className="card-title">
                {this.state.name
                  .toLowerCase()
                  .split(' ')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')}
              </h6>
            </div>

          </Card>
        </StyledLink>
      </div>
    );
  }
}