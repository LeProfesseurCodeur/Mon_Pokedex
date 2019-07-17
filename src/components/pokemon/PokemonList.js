import React, { Component } from 'react';
import axios from 'axios'; // bibliothèque async/wait basée sur des promesses pour le code asynchrone lisible. 
                           // Nous pouvons facilement intégrer React.js et il est facile à utiliser dans n’importe quel framework frontal.
import PokemonCard from './PokemonCard';
export default class PokemonList extends Component {
    // URL Pokedex 
    state = { // state est l'endroit d'où proviennent les données. 
        url : 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=250',
        pokemon: null,
        filterValue: '',
        filteredPokemon: null
    };

    //  Search Bar avec système de filtre
    filterChange = (e) => {
        this.setState({filterValue: e.target.value}) // e.target = C'est une référence à l'objet qui a envoyé l'événement.
    }
    applyFilter = async (e) => { // async : renvoie systématiquement une promesse 

        e.preventDefault(); // La méthode preventDefault() de l 'interface Event indique à l'agent utilisateur que si l'événement n'est 
                            // pas traité explicitement, son action par défaut ne doit pas être prise en compte comme elle le serait 
                            // normalement. L'événement continue à se propager comme d'habitude, sauf si l'un de ses écouteurs appelle 
                            // stopPropagation() 

        await this.setState({ // permet d’attendre la résolution d’une promesse et retourner sa valeur.
            filteredPokemon: this.state.pokemon.filter(elem => {
                return elem.name.includes(this.state.filterValue);
            })
        })
        //console.log(this.state.filteredPokemon);
    }

    async componentDidMount() { // requête de type GET
        const res = await axios.get(this.state.url);
        this.setState({ pokemon: res.data['results'] });
    }
    render() {          
        return ( 
            <React.Fragment>
                <form onSubmit={(e) => this.applyFilter(e)}>
                    <input type="text" value={this.state.filterValue} onChange={(e) => this.filterChange(e)} />
                    <button type="submit">Apply</button>
                    <button type="button" onClick={() => this.setState({filteredPokemon: null, filterValue: ''})}>Reset</button>
                </form>                    

                {this.state.pokemon ? (
                    <div className="row"> 
                        {this.state.filteredPokemon ? 
                            this.state.filteredPokemon.map(pokemon => (
                                <PokemonCard 
                                    key={pokemon.name}
                                    name={pokemon.name}
                                    url={pokemon.url}
                                />
                            ))
                            :
                            this.state.pokemon.map(pokemon => (
                                <PokemonCard 
                                    key={pokemon.name}
                                    name={pokemon.name}
                                    url={pokemon.url}
                                />
                            ))
                        }
                    </div> // Affichage des card dans le menu d'acceuil 
                ) : (
                    <h1>Loading Pokemon</h1> // rafraîchissement de la page 
                )}
            </React.Fragment>
        );
    }
}