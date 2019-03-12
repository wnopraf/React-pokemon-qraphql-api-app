import React from 'react'
import Loader from '../loader'
import { fetchData } from '../../lib/fetchdata'
import { Link } from 'react-router-dom'
import './style.css'
export default class extends React.Component {

    state = { data: {}, loading: true }
    componentDidMount() {
        this.query()
    }
    async componentDidUpdate(prevProps, state) {
        if (prevProps.match.params.id === this.props.match.params.id) return
        await this.query()  
    }
    async query () {
        const { match: { params } } = this.props
         
        const query = `query {
                pokemon(id: "${params.id}") {
                    name 
                    weight {
                    minimum
                    maximum
                    }
                    image
                    height {
                    minimum
                    maximum
                    }
                    
                    fleeRate
                    maxCP
                    resistant
                    evolutions {
                        id
                        name
                        image
                    }
                }
                
                }`
        this.setState({loading: true})
        const data = await fetchData(query)
        this.setState({ data, loading: false })
    }
    render(){
        const { data: {pokemon} } = this.state
        return this.state.loading ? <Loader /> : <div className="poke-info">
            <div className="poke-info__box">
                <div className="poke-item">
                    <h1>{pokemon.name}</h1>
                    <div className="poke-item__img">
                        <img src={pokemon.image} alt="" />
                    </div>

                </div>
                <div className="features">

                    <div className="comp-prop">
                        <div className="prop">weight</div>
                        <div className="value">minimum:  {pokemon.weight.minimum}</div>
                        <div className="value">maximum: {pokemon.weight.maximum} </div>
                    </div>
                    <div className="comp-prop">
                        <div className="prop">height</div>
                        <div className="value">minimum: {pokemon.height.minimum}</div>
                        <div className="value">maximum: {pokemon.height.maximum} </div>
                    </div>
                    <div className="prop">fleeRate</div>
                    <div className="value">{pokemon.fleeRate}</div>
                    <div className="prop">maxCP</div>
                    <div className="value">{pokemon.maxCP}</div>
                    <div className="prop">resistant</div>
                    <div className="value">{pokemon.resistant.map(e => <span>{e + ' '}</span>)}</div>

                </div>
            </div>
            
            <div className="poke-evol">
                <h3>Evolutions</h3>
                {pokemon.evolutions === null && <p>Last evolution</p>}
                <div className="poke-evol__items">
                    {pokemon.evolutions && pokemon.evolutions.map((e, i) => <Link to={`/pokemon/${e.id}`}>

                        <div className="poke-evol__item" key={i}>
                            <h2>{e.name}</h2>
                            
                                <img src={e.image} alt="" />
                            

                        </div>

                    </Link>)}
                </div>

            </div>
            <div className="link-box">
              <Link to="/">Back to list</Link> 
            </div>
        </div>
    }
}