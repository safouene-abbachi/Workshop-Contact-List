import React, { Component } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';
class AddContact extends Component {
  state = {
    name: '',
    mail: '',
    tel: '',
  };
  componentDidMount() {
    this.props.isEdit &&
      this.setState({
        name: this.props.contact.name,
        mail: this.props.contact.mail,
        tel: this.props.contact.tel,
        id: this.props.contact._id,
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  clickHandler = () => {
    this.props.handleShow();
    this.props.handleAdd(this.state);
  };
  render() {
    const { show, handleShow } = this.props;
    console.log('AddContact -> render -> this.props', this.props);
    return (
      <div>
        <Button variant='primary' onClick={handleShow}>
          ADD
        </Button>

        <Modal show={show} onHide={handleShow} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              type='text'
              name='name'
              placeholder='Please Enter a name....'
              defaultValue={this.state.name}
              onChange={this.handleChange}
            />

            <FormControl
              type='text'
              name='mail'
              placeholder='Please Enter a mail....'
              defaultValue={this.state.mail}
              onChange={this.handleChange}
            />
            <FormControl
              type='text'
              name='tel'
              placeholder='Please Enter a phone number....'
              defaultValue={this.state.tel}
              onChange={this.handleChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => handleShow()}>
              close
            </Button>
            <Button variant='primary' onClick={() => this.clickHandler()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default AddContact;
