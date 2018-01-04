import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

    renderContent(){
        // if(this.props.auth != null){
        //     if(this.props.auth.passport!=null){

        //         if((Object.keys(this.props.auth.passport).length) ===0){
        //             return <li><a href="/auth/google">Login with Google</a></li>;
    
        //         }else{
        //             return <li><a>Logout</a></li>;
        //         }

        //     }else{
        //         return <li><a href="/auth/google">Login with Google</a></li>;
        //     }
           
            
        // }else{
        //     return;
        // }

        switch (this.props.auth) {
            case null:
              return;
            case false:
              return <li><a href="/auth/google">Login With Google</a></li>;
            default:
              return <li><a href="/api/logout">Logout</a></li>;
          }
    }

    render() {
        // console.log("props" , this.props.auth);        
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link 
                    to={this.props.auth ? '/surveys' : '/'} 
                    className="left brand-logo">
                    Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
            
        );
    }
}

function mapstateToProps({auth}){
    return {auth};
}

export default connect(mapstateToProps)(Header);