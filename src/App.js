
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';

class App extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      contact: '',
      name: ''
    }
  }

  handleChange(e){
    e.preventDefault();
    this.setState({
      contact: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let contact = {
      name: this.state.contact
    }
    this.setState({
      contact: '',
      name: ''
    });
    this.props.createContact(contact);
  }

  handleName = (e) => {
    e.preventDefault();
    this.setState({
      name: e.target.value
    })
  }

  handleButton = (e) => {
    e.preventDefault();
    alert(this.state.name);
  }

  listView(data, index){
    return (
      <div className="row">
        <div className="col-md-10">
          <li key={index} className="list-group-item clearfix">
            {data.contact}
          </li>
        </div>
        <div className="col-md-2">
          <button onClick={(e) => this.deleteContact(e, index)} className="btn btn-danger">
            Remove
          </button>
        </div>
    </div> 
    )
  }

  deleteContact(e, index){
    e.preventDefault();
    this.props.deleteContact(index);
  }

  render() {

    return(
      <div className="container">
        <h1>Contacts Application Form</h1>
        <hr />
        <div>
          <h3>Add Contact Here</h3>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} className="form-control" value={this.state.contact}/><br />
            <input type="submit" className="btn btn-success" value="ADD"/>
            <button>+</button>
          </form>
          <hr />
        { <ul className="list-group">
          {this.props.contacts.map((contact, i) => this.listView(contact, i))}
        </ul> }
        <h4>Insert Your Name Here</h4>
        </div>
        <hr/>
        <input type="text" onChange={this.handleName}/>
        <button onClick={this.handleButton}>Save</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    deleteContact: index =>dispatch(contactAction.deleteContact(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);