import React, { Component } from 'react'
class Header extends Component {
    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
    }
    handleLogout() {
        this.props.logout()
    }
    render() {
        return (
            <nav class="navbar navbar-expand-sm navbar-light ">
                <a class="navbar-brand text-white" href="#">Fashion Factory</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa fa-bars fa-lg text-white" ></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    {Object.keys(this.props.user.user).length !== 0
                        ?
                        <span class="navbar-text  text-white ml-auto">
                            <button className='btn btn-info' onClick={this.handleLogout}>Logout</button>
                        </span>
                        :
                        <span class="navbar-text  text-white ml-auto">
                            <button className='btn btn-info' onClick={() => this.props.history.push('/signin')}>Login</button>
                        </span>
                    }

                </div>
            </nav>
        )
    }
}
export default Header