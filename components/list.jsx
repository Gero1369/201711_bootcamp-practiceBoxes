const React = require('react')
const ReactDOM = require('react-dom')

const UserView = require('./userview.jsx')

let tableStyles = {
    margin: '2em',
    width: '60%'
}

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {data: [],name:'', msg:''}
        this.handleFetch = this.handleFetch.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleMsgChange = this.handleMsgChange.bind(this)
    }

    handleMsgChange(event){
        this.setState({msg: event.target.value})
    }

    handleNameChange(event){
        this.setState({name: event.target.value})
    }

    handleFetch(){
    // console.log(this.state)
        let now = Date.now()
        console.log(now)
        fetch(`/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                text: this.state.msg
            })
        })

        .then(response=>response.json())
      .then(json=>json.ops[0])
      .then(newMessage=>{
        console.log(newMessage)
        // Keep an eye on this and maybe clone array. Beware of refences
        const oldArray = this.state.data
        oldArray.unshift(newMessage)
        // oldArray.splice(index, 1)        
        this.setState({data: oldArray}, ()=>{
          this.setState({msg: ''})
          this.setState({name: ''})
        })
    })
        // .then((response) => {
        //     let resp = response.json()
        //     console.log(resp)
        //     console.log(`sec: ${(Date.now() - now)/1000}`)
        //     let added = response.ops[0]
        //     let oldArray = 
        //     // this.setState({data: resp})
        // })
        // .then((response) => response.json())
        // .then(json => {
        //     this.setState({data: json})
        //     console.log('I made it to here')
        // })
        // .catch(error => console.error(error))
    }   // end handleFetch

    componentDidMount(){
        fetch('/messages')
            .then((response) => response.json())
            .then(json => this.setState({data: json}))
            .catch(error => console.error(error))
    }

    render() {
        return <div>
            <div style={tableStyles}>
            <label htmlFor="nameInput">Name: </label><input id="nameInput" type="text" onChange={this.handleNameChange} value={this.state.name}/><br />
            <label htmlFor="messageInput">Message: </label><input id="messageInput" type="text" onChange={this.handleMsgChange} value={this.state.msg}/>
            <button className="btn btn-info" onClick={this.handleFetch}>Send Message</button>
            </div>
         <table style={tableStyles} className="table">
            <thead>
        <tr>
            {/* <th>Id</th> */}
            <th>Name</th>
            <th>Text</th>
        </tr>
    </thead>
    <tbody>
            {this.state.data.map((name,index)=><UserView key={index} data={name}/>)}
    </tbody>
        </table>
        </div>
    }
}


module.exports = List