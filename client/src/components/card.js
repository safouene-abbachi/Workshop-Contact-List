import React, { Component } from 'react';
import AddContact from './AddContact';

class Card extends Component {
  state = {
    isShow: false,
  };

  showHandler = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  render() {
    const { _id, name, tel, mail } = this.props.person;
    console.log(this.props);
    return (
      <>
        <div className='card'>
          <img
            src='https://png.pngtree.com/svg/20170802/f96d8acc9e.png'
            alt='Eiffel Tower'
          ></img>
          <h3>{name}</h3>

          <span role='img' aria-label='mail'>
            📧 :{mail}
          </span>
          <br />
          <span role='img' aria-label='mail'>
            📱 :{tel}
          </span>
          <br />

          <button
            type='button'
            className='btn btn-outline-info'
            onClick={() => this.showHandler()}
          >
            EDIT
          </button>

          <button
            type='button'
            className='btn btn-outline-danger'
            onClick={() => this.props.handleDelete(_id)}
          >
            DELETE
          </button>
          {this.state.show ? (
            <AddContact
              show={this.state.show}
              handleShow={this.showHandler}
              isEdit={true}
              handleAdd={this.props.handleEdit}
              contact={this.props.person}
            />
          ) : null}
        </div>
      </>
    );
  }
}
export default Card;
