import React from 'react'
import { Link } from 'react-router-dom'
import Loader from '../loader'
import './style.css'

export default class extends React.Component {
  componentDidMount() {
    document.scrollingElement.scrollTop = this.props.scrollTop
  }
  render() {
    const {
      data: { pokemons },
      loading,
      fetchLimit
    } = this.props
    const pokelist = pokemons.map((e, i) => {
      return <PokeDesc pokemon={e} key={i} />
    })
    return (
      <div className="container">
        {pokelist}
        {loading && <Loader />}
        {fetchLimit && (
          <div>
            <p>No more pokemons to fetch</p>
          </div>
        )}
      </div>
    )
  }
}
const PokeDesc = ({ pokemon, match }) => {
  return (
    <section>
      <Link to={`pokemon/${pokemon.id}`}>
        <div className="pokedesc">
          <img src={pokemon.image} alt="" />
          <h1>{pokemon.name}</h1>
        </div>
      </Link>
    </section>
  )
}
