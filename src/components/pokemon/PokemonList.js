import React, { Component } from 'react';
import axios from 'axios'; 
import PokemonCard from './PokemonCard';
export default class PokemonList extends Component {
    // URL Pokedex 
    state = {
        url : 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=250',
        pokemon: null,
        filterValue: '',
        filteredPokemon: null
    };

    //  Search Bar avec système de filtre
    filterChange = (e) => {
        this.setState({filterValue: e.target.value}) 
    }
    applyFilter = async (e) => {

        e.preventDefault();

        await this.setState({
            filteredPokemon: this.state.pokemon.filter(elem => {
                return elem.name.includes(this.state.filterValue);
            })
        })
        //console.log(this.state.filteredPokemon);
    }

    async componentDidMount() { 
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
                    </div>
                ) : (
                    <h1>Loading Pokemon</h1>
                )}
            </React.Fragment>
        );
    }
}