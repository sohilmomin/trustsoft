import React, { Component } from 'react'
import { UncontrolledDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function SideBar() {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12 p-0'>
                    <ul className=' sidebar list-unstyled'>
                        <li className='list-item'>Home</li>
                        <li className='list-item'>Office</li>
                        <li className='list-item'>Products</li>
                        <li className='list-item'>Categories</li>
                        <li className='list-item'>Profile</li>
                        <li className='list-item'>Following</li>
                        <li className='list-item'>Feedbacks</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default SideBar