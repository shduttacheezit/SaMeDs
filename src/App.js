import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'; // ES6
// import searchMeds from './Components/searchMeds'
// import maincomponent from './Components/maincomponent'
// import searchBox from './Components/searchBox'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      box: 'Type drug name',
      items: []
    }
  }
  update() {
    this.setState = ({
      box: this.search.value })
  }
  componentWillMount() {
    if (this.props.box) {
      fetch( 'https://rxnav.nlm.nih.gov/REST/drugs.json?name={this.search.value}' )
        .then( response => response.json() )
        .then( ({results: items}) => this.setState({items}))
    }
  }
  componentDidUpdate(){
    console.log('Component update')
  }
  render() {
    let items = this.state.items
    return (
      <div className="App">
        <h1>{this.props.head}
        </h1>
        <p>
          <input 
          ref={node => this.search = node}  
          type="text" 
          placeholder={this.state.box}
          onChange={this.update.bind(this)}/>
          <Button>Search Drug</Button>
          {items.map(item => 
            <Drug key={item.name} drug={item} />)}
        </p>
        <footer> {this.props.txt}
        </footer>
      </div>
    );
  }
}
const Drug = (props) => <h4>{props.drug.name}</h4>

const Button = (props) => <button>{props.children}</button>


App.propTypes = {
  head: PropTypes.string,
  txt: PropTypes.string,
  box: PropTypes.string
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App;


