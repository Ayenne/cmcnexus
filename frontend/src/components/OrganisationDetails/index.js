import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'
import { organisationsFunction } from "../../store/actions/Organisations/organisationsAction";
import { Container, HeaderTitle, Stripe, DetailsContainer, CategoryWrapper } from "../CaseDetails/styles";
import { AddButton } from "../AddOrganisation/styles";
import { setNavigationAction } from '../../store/actions/Navigation';
import { ORGANISATIONS } from '../Navigation/states';


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

    const history = useHistory();
    const redirectHandler = () => {
        history.push(`/organisations/edit/${organisationDetails.id}/`)
    };


  return (
    <Container>
      {organisationDetails ? (
        <>
          <HeaderTitle>Organisation Details of {organisationDetails.name}</HeaderTitle>
          <Stripe>name</Stripe>
          <DetailsContainer>{organisationDetails.name}</DetailsContainer>
          <Stripe>description</Stripe>
          <DetailsContainer>{organisationDetails.description}</DetailsContainer>
          <Stripe>service</Stripe>
          <DetailsContainer>{organisationDetails.services}</DetailsContainer>
          <Stripe>category</Stripe>
          <DetailsContainer>
              <CategoryWrapper>
              {organisationDetails.categories.map(category => {
            return (
                <div key={category.id}>{category.name}</div>
                    )
          })}
              </CategoryWrapper>
          </DetailsContainer>
          <Stripe>tag</Stripe>
          <DetailsContainer>
            {organisationDetails.tag}
          </DetailsContainer>
          <Stripe>members</Stripe>
          <DetailsContainer>
            {organisationDetails.members}
          </DetailsContainer>
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
