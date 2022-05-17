const React = require('react')
const ReactDOM = require('react-dom')
    
let butStyles = {
    float: 'right'
}

class UserView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.deleteItem = this.deleteItem.bind(this)
    }

    deleteItem(){
        fetch(`/messages/${this.props.data._id}`, {
            method: 'DELETE'
        })
        .then(response=>response.json())
        .then(json=>{
            console.log(json)
            // Keep an eye on this and maybe clone array. Beware of refences
            // const oldArray = this.state.messages
            // oldArray.splice(index, 1)        
            // this.setState({messages: oldArray})
        })
        .then(removeLine=>{
            let thisLine = document.getElementById(this.props.data._id)
            thisLine.parentNode.removeChild(thisLine)
        })
    }   // end handleFetch


    render() {
        return <tr id={this.props.data._id}>
            {/* <td>{this.props.data._id}</td> */}
            <td>{this.props.data.name}</td>
            <td className="valign-middle">{this.props.data.text}<button onClick={this.deleteItem} className="button btn-cta tertiary tiny valign-middle" style={butStyles}>Delete Me!</button></td>
        </tr>
    }
}


module.exports = UserView