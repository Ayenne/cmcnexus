import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { organisationsFunction } from "../../store/actions/Organisations/organisationsAction";
import { useHistory } from 'react-router-dom'
import {HeaderTitle, Stripe, DetailsContainer} from "../CaseDetails/styles";
import {AddButton} from "../AddOrganisation/styles";
import {setNavigationAction} from '../../store/actions/Navigation';
import {ORGANISATIONS} from '../Navigation/states';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  background-color:#ebebeb;
`;

const StripeSmall = styled(Stripe)`
width: 20%; 
font-size: 16px; 
`;

const DetailsContainerCategory = styled(DetailsContainer)`
box-shadow: none; 
padding: 0; 
background-color: #ebebeb;
`;

const DetailsContainerSmall = styled.div`
width: auto;
display: flex; 
align-self: flex-start;
padding: 20px; 
background-color: white;
border-radius: 5px;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;


function OrganisationDetails(props) {
  const dispatch = props.dispatch;

  useEffect(() => {
    dispatch(organisationsFunction());
    dispatch(setNavigationAction(ORGANISATIONS));
  }, [dispatch]);

  const organisationDetails = props.organisations
    ? props.organisations.find(
        (organisation) => organisation.id === Number(props.match.params.id)
      )
    : null;

    const history = useHistory()
    const redirectHandler = () => {
        history.push(`/organisations/edit/${organisationDetails.id}/`)
    }


  return (
    <Container>
      {organisationDetails ? (
        <>
          <HeaderTitle>{organisationDetails.name}</HeaderTitle>
          <StripeSmall>description</StripeSmall>
          <DetailsContainer>{organisationDetails.description}</DetailsContainer>
          <StripeSmall>service</StripeSmall>
          <DetailsContainer>{organisationDetails.services}</DetailsContainer>
          <StripeSmall>category</StripeSmall>
          <DetailsContainerCategory>
            <DetailsContainerSmall>{organisationDetails.categories.map(category => {
            return (
                <div key={category.id}><b>{category.name}</b></div>
                    )
          })}</DetailsContainerSmall>
          </DetailsContainerCategory>
          <StripeSmall>tag</StripeSmall>
          <DetailsContainerCategory>
            <DetailsContainerSmall>{organisationDetails.tag}</DetailsContainerSmall>
          </DetailsContainerCategory>
          <StripeSmall>members</StripeSmall>
          <DetailsContainerCategory>
            <DetailsContainerSmall>{organisationDetails.members}</DetailsContainerSmall>
          </DetailsContainerCategory>
        </>
      ) : (
        <div>This organisation does not exist.</div>
      )}
      <AddButton onClick={redirectHandler}>Edit</AddButton>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations,
  };
};

export default connect(mapStateToProps)(OrganisationDetails);
