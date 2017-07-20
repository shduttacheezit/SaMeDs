import React from 'react'

var createReactClass = require('create-react-class');

var searchMeds = createReactClass({
            propTypes: {
                

            },
            getInitialState() {
                return {
                    
                }
            },
            componentWillMount() {
                if (this.props.count) {
                    var url = `https://rxnav.nlm.nih.gov/REST/?`
                    fetch(url)
                          .then(results => results.json())
                          .then(array => array[0])
                          .then(text => text.split('. '))
                          .then(array => array.forEach(
                                sentence => this.add(sentence)))
                          .catch(function(err) {
                            console.log("Didn't connect to the API", err)
                          })
                }
            },
            add(text) {
                var notes = [
                    ...this.state.notes,
                    {
                        id: this.nextId(),
                        note: text
                    }
                ]
                this.setState({notes})
            },
            update(newText, id) {
                var notes = this.state.notes.map(
                    note => (note.id !== id) ?
                       note : 
                        {
                            ...note, 
                            note: newText
                        }
                    )
                this.setState({notes})
            },
            remove(id) {
                var notes = this.state.notes.filter(note => note.id !== id)
                this.setState({notes})
            },
            eachNote(note) {
                return (<Note key={note.id}
                              id={note.id}
                              onChange={this.update}
                              onRemove={this.remove}>
                          {note.note}
                        </Note>)
            },
            render() {
                return (<div className='searchMeds'>
                           {this.state.notes.map(this.eachNote)}
                           <button onClick={() => this.add('New Note')}>+</button>
                        </div>)
            }
        })

export default searchMeds