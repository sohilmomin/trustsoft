import React, { Component } from 'react'
import { LocalForm, Control, Errors, controls } from 'react-redux-form'
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap'

const minLength = (len) => (value) => !value || value.length >= len
const maxLength = (len) => (value) => !value || value.length <= len
const required = (value) => value && value.length

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(values) {
        this.props.signIn(values.name, values.password)
    }
    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-6 col-12 pl-0 pr-0'>
                        <img className=' auth-image img img-fluid img-responsive ' src='/assets/images/1-2.png' alt='biggest offer'></img>
                    </div>
                    <div className='col-12 col-lg-6 pl-0 align-self-center'>
                        <div className='row'>
                            <div className='col-lg-8 col-12 m-auto signup-block'>
                                <h1 className='text-center auth-heading mt-5'>SignIn</h1>
                                <LocalForm onSubmit={this.handleSubmit} row>
                                    <Row className='form-group'>
                                        <Col md={12} className='m-auto'>
                                            <Control.text model='.name'
                                                id='name'
                                                className='form-control'
                                                placeholder='Username*'
                                                validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                                            />
                                            <Errors
                                                className='form-error'
                                                model='.name'
                                                show='touched'
                                                messages={{
                                                    required: 'Required, ',
                                                    minLength: 'Must be at least 3 character long ',
                                                    maxLength: 'Must be at most 15 character long '
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='form-group'>
                                        <Col md={12} className='m-auto'>
                                            <Control type='password' model='.password'
                                                id='password'
                                                className='form-control'
                                                placeholder='Password*'
                                                validators={{ required, minLength: minLength(3), maxLength: maxLength(30) }}
                                            />
                                            <Errors
                                                className='form-error'
                                                model='.password'
                                                show='touched'
                                                messages={{
                                                    required: 'Required, ',
                                                    minLength: 'Must be at least 3 character long ',
                                                    maxLength: 'Must be at most 30 character long '
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <FormGroup row>
                                        <Col md={{ size: 12 }} className='text-center m-auto'>
                                            <Button type='submit' className='btn-block signup-btn' >SIGN IN</Button>
                                        </Col>
                                    </FormGroup>
                                </LocalForm>
                                <div className='auth-link-block'>
                                    <p className='mb-1'><a href="#" className='auth-link'>Forget Password?</a></p>
                                    <p className='mb-3'>Dont have an account?<a href="signup" className='auth-link'>Sign up</a></p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
export default SignIn