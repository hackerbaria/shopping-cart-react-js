import React, { Component } from 'react'
import './css/Footer.css'

class Footer extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <footer className = "footer">
                    <span className="text-muted">All Rights Reserved 2021 @gaOnline</span>
                </footer>
            </div>
        )
    }
}

export default Footer
