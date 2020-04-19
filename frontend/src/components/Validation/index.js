import React, { Component } from 'react'
import { connect } from "react-redux";
import { RedButton } from '../../styles/Buttons';
import styled from 'styled-components';
import {validateCaseFunction} from '../../store/actions/Cases/updateCaseAction';
import {rejectCaseFunction} from '../../store/actions/Cases/rejectCaseAction';


const ButtonContainer = styled.div`
display: flex; 
margin-top: 3%; 
`;

const Button = styled(RedButton)`
 height: 40px;
 width: 100px; 
 margin: 3%;    
`;


class Validation extends Component {

    acceptHandler = async(e) => {
        e.preventDefault();
        this.props.dispatch(validateCaseFunction(this.props.id))
    };

    rejectHandler = async(e) => {
        e.preventDefault();
        this.props.dispatch(rejectCaseFunction(this.props.id))
    };

    render() {
        return (
            <ButtonContainer>
                <Button onClick={this.acceptHandler}>Accept</Button> 
                <Button onClick ={this.rejectHandler}>Reject</Button> 
            </ButtonContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      cases: state.cases
    };
  };
  
  export default connect(mapStateToProps)(Validation);
