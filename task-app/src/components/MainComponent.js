import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchOffers, postOffer, editOffer, deleteOffer, logout, signIn, signUp } from '../redux/ActionCreator'
import Header from './headerComponent';
import SideBar from './SideBarComponent';
import Offer from './OfferComponent'
import SignIn from './SignInComponent'
import SignUp from './SignUpComponent'
import { Component } from 'react';
import { UncontrolledDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const mapStateToProps = state => {
    return {
        offers: state.offers,
        user: state.user
    }
}
const mapDispatchToProps = dispatch => ({
    fetchOffers: () => { dispatch(fetchOffers()) },
    postOffer: (product, amount, description, active) => { dispatch(postOffer(product, amount, description, active)) },
    editOffer: (offerId, product, amount, description, active) => { dispatch(editOffer(offerId, product, amount, description, active)) },
    deleteOffer: (offerId) => { dispatch(deleteOffer(offerId)) },
    signUp: (name, email, password) => { dispatch(signUp(name, email, password)) },
    signIn: (name, password) => { dispatch(signIn(name, password)) },
    logout: () => { dispatch(logout()) }
})
class Main extends Component {
    componentDidMount() {
        this.props.fetchOffers()
    }
    render() {
        return (
            <>

                <Switch>
                    <Route path='/signin'>
                        <SignIn signIn={this.props.signIn} history={this.props.history} />
                    </Route>
                    <Route path='/signup'>
                        <SignUp signUp={this.props.signUp} history={this.props.history} />
                    </Route>
                    <Route exact path='/'>
                        <Header user={this.props.user} logout={this.props.logout} history={this.props.history} />
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-lg-2 d-none d-lg-block pl-0 pr-0'>
                                    <SideBar />
                                </div>
                                <div className='col-12 d-lg-none d-block'>
                                    <UncontrolledDropdown >
                                        <DropdownToggle caret className='menu col-12 '>Menu</DropdownToggle>
                                        <DropdownMenu>
                                            <SideBar />
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                                <div className='col-lg-10 col-12 '>
                                    <Offer user={this.props.user} history={this.props.history} offers={this.props.offers} postOffer={this.props.postOffer} editOffer={this.props.editOffer} deleteOffer={this.props.deleteOffer} />
                                </div>
                            </div>
                        </div>
                    </Route>
                    <Redirect to='/signin' />
                </Switch>
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
