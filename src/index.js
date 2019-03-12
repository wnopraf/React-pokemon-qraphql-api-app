import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PokeList from './components/pokelist'
import PokeInfo from './components/pokeinfo'
import { fetchData } from './lib/fetchdata'
import './styles.css'

class PokeApp extends React.Component {
  state = { data: { pokemons: [] }, loading: true }
  scrolli = this.onScroll()
  scrollTop = 0
  fetchTimes = 1
  fetchLimit = false
  async componentDidMount() {
    const initPagination = 5
    const query = `query {
          pokemons(first: ${this.fetchTimes * initPagination}) {
            id
            image
            name
          }
        }`
    const data = await fetchData(query)
    this.setState({ data, loading: false })
    this.fetchTimes += 1
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrolli)
  }
  onScroll(pagination = 5) {
    const totalPokeList = 145

    return async () => {
      this.scrollTop = document.scrollingElement.scrollTop
      const { pokemons } = this.state.data
      if (this.state.loading) return

      if (
        document.scrollingElement.scrollTop + window.innerHeight >=
        document.scrollingElement.scrollHeight
      ) {
        this.setState({ loading: true })
        const query = `query {
          pokemons(first: ${this.fetchTimes * pagination}) {
            id
            image
            name
          }
        }`
        const data = await fetchData(query)
        if (pokemons.length >= totalPokeList) {
          this.fetchLimit = true
        }
        this.setState({ data, loading: false })

        this.fetchTimes += 1
      }
    }
  }
  componentDidUpdate() {
    this.fetchLimit && window.removeEventListener('scroll', this.scrolli)
  }
  render() {
    return (
      <div className="app">
        <header>
          <h1>PokeApp</h1>
        </header>
        <Router>
          <div className="container">
            <Route
              exact
              path="/"
              render={() => {
                if (!this.fetchLimit) {
                  window.addEventListener('scroll', this.scrolli)
                }

                return (
                  <PokeList
                    {...this.state}
                    fetchLimit={this.fetchLimit}
                    scrollTop={this.scrollTop}
                  />
                )
              }}
            />
            <Route
              path="/pokemon/:id"
              render={props => {
                window.removeEventListener('scroll', this.scrolli)

                return <PokeInfo {...props} />
              }}
            />
          </div>
        </Router>
        <footer className="container">
          <div className="footer-content">
            <p>Thanks to LucasBento graphql api.</p>
          </div>
        </footer>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<PokeApp />, rootElement)
