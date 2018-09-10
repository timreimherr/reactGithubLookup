import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


   const Card = (props) => {
   	return (

      <div className="media" style={{margin: "1em"}}>
        <div className="media-left">
          <img className="media-object" width="75" style={{marginRight: "1em"}} src={props.avatar_url} alt="User's face" />
        </div>
        <div className="media-body">
        <h5 className="media-heading text-left" style={{fontSize: "1.25em", fontWeight: "bold"}}>{props.name}</h5>
        <p className="text-left">{props.company}</p>
        </div>
      </div>
     );
   };
   
   const CardList = (props) => {
   	return (
      <div className="list-unstyled">
     	  {props.cards.map(card => <Card key={card.id} {...card} />)}
     	</div>
     )
   }

   class Form extends React.Component {
   	state = { userName: ''}
     handleSubmit = (event) => {
     	event.preventDefault();
     axios.get(`https://api.github.com/users/${this.state.userName}`).then(resp => {
     	this.props.onSubmit(resp.data);
       this.setState({ userName: ''});
       });
     }
   	render () {
     	return (
        <div style={{ margin: "auto"}}>
       	<form className="form-inline" onSubmit={this.handleSubmit} >
         <div className="input-group mb-3">
          <input type="text"
            value={this.state.userName}
            onChange={(event) => this.setState({ userName: event.target.value})}
            placeholder=" Github username" 
            required  
            class="form-control" 
            id="searchInput" 
            placeholder="Github Username" />
          <div className="input-group-append">
            <button type="submit" className="btn btn-info">Add card</button>
          </div>
         </div>
       	</form>
         </div>
       )
     };
    }



class App extends Component {
  state = {
    response: '',
    cards: [
       {	name: "Paul O’Shannessy",
         avatar_url: "https://avatars1.githubusercontent.com/u/8445?v=4",
         company: "Facebook"},
       {	name: "Ben Alpert",
         avatar_url:"https://avatars1.githubusercontent.com/u/6820?v=4" ,
         company: "Facebook"},
    ]
  };


  addNewCard = (cardInfo) => {
  this.setState(prevState => ({
    cards: prevState.cards.concat(cardInfo)
    }))
  }
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Powered by React</h1>
        </header>
       <div className="container">
        <br/>
          <div className="row justify-content-start">
            <Form onSubmit={this.addNewCard}/>
          </div>
         <div className="row justify-content-center">
          <CardList cards={this.state.cards}/>
         </div>
          
     	  </div>
      </div>
    );
  }
}

export default App;
