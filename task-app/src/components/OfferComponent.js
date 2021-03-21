import React, { Component } from 'react'
import { FormGroup, Button, Col, Row, Modal, ModalBody, ModalHeader, Label } from 'reactstrap'
import { LocalForm, Control, Errors } from 'react-redux-form'
class OfferForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(values) {
        this.toggleModal()
        this.props.postOffer(values.product, values.amount, values.description)
    }
    toggleModal() {
        this.setState({
            isModalOpen: !(this.state.isModalOpen)
        })
    }

    render() {
        return (
            <span>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        <h4 className='review-form-heading'>Add offer</h4>
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Col md={12}>
                                    <Label md={12} className='pl-0 pr-0' htmlFor='.product'>Product</Label>
                                    <Col md={12} className='pl-0 pr-0'>
                                        <Control.text model='.product'
                                            id='product'
                                            className='form-control'
                                            placeholder='plants'
                                        />
                                    </Col>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={12}>
                                    <Label md={12} className='pl-0 pr-0' htmlFor='.amount'>Amount</Label>
                                    <Col md={12} className='pl-0 pr-0'>
                                        <Control.text model='.amount'
                                            id='amount'
                                            className='form-control'
                                            placeholder='30%'
                                        />
                                    </Col>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={12}>
                                    <Label md={12} className='pl-0 pr-0' htmlFor='.description'>Description</Label>
                                    <Col md={12} className='pl-0 pr-0'>
                                        <Control.text model='.description'
                                            id='description'
                                            className='form-control'
                                            placeholder='flat 30% off on all pants'
                                        />
                                    </Col>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 12 }} className='text-center'>
                                    <Button type='submit' color="primary">Submit</Button>
                                </Col>
                            </FormGroup>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                {Object.keys(this.props.user.user).length !== 0
                    ?
                    <button className='btn add-offer mt-3 ml-2 mb-4' onClick={this.toggleModal}>ADD OFFER</button>
                    :
                    <div className='p-2 m-2'>
                        <p>You Are not logged In, Login to add offer or delete offer</p>
                    </div>
                }
            </span>
        )
    }
}

class Offer extends Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }
    handleDelete() {
        Object.keys(this.props.user.user).length !== 0
            ?
            this.props.deleteOffer(this.props.offer._id)
            :
            console.log('You are not logged In. You cant delete.')
    }
    render() {
        return (
            <tr className='table-row'>
                <td scope="row">{this.props.offer.product}</td>
                <td>{this.props.offer.amount}</td>
                <td>{this.props.offer.description}</td>
                <td>
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                    </label>
                </td>
                <td>
                    <span className='fa fa-eye action-icon'></span>
                    <span className='fa fa-pencil action-icon'></span>
                    <span className='fa fa-trash action-icon' onClick={this.handleDelete}></span>

                </td>
            </tr>

        )
    }
}
class Offers extends Component {
    render() {
        const offerslist = this.props.offers.offers;
        const offerList = offerslist.map(offer => {
            return (
                <tbody>
                    <Offer user={this.props.user} offer={offer} editOffer={this.props.editOffer} deleteOffer={this.props.deleteOffer} />
                </tbody>
            )
        })
        return (

            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 pl-0'>
                        <h1 className='heading'>Offer Details</h1>
                        <OfferForm postOffer={this.props.postOffer} history={this.props.history} user={this.props.user} />
                        <div className='container-fluid table-block'>
                            <div className='row'>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead className='table-heading'>
                                            <tr>
                                                <th scope="col"><p className='table-row-heading'>Products</p></th>
                                                <th scope="col"><p className='table-row-heading'>Amount</p></th>
                                                <th scope="col"><p className='table-row-heading'>Description</p></th>
                                                <th scope="col"><p className='table-row-heading'>Active</p></th>
                                                <th scope="col"><p className='table-row-heading'>Actions</p></th>
                                            </tr>
                                        </thead>
                                        {offerList}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Offers