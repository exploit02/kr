import React from 'react'
import './welcomes.css'

function welcome() {
    return (
        <div>
          <header>
            <div className="navbar">
                <div className="logo">Krishi</div>
                    <div>
                        <ul>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
        </header>
        <div>
        {/* <div>
            <img src={require('./../../assests/images/krishi.jpg')} className="image"/>
        </div> */}
        
        </div>
            <div class="main-loader">
            <div class="progress">
      <div class="indeterminate"></div>
  </div>
            </div>
        </div>
    )
}

export default welcome
