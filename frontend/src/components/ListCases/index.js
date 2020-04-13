import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {organisationsFunction} from "../../store/actions/organisationsAction";
import {searchOrganisationsFunction} from "../../store/actions/searchOrganisationsAction";
import { GreyRoundInput } from "../../styles/Inputs";
import { RedButton } from "../../styles/Buttons";
import {casesFunction} from "../../store/actions/casesAction";
import {searchCasesFunction} from "../../store/actions/searchCasesAction";


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled(GreyRoundInput)`
  width: 250px;
  height: 30px;
`;

const SearchButton = styled(RedButton)`
  width: 75px;
  height: 30px;
`;

const AddCaseButton = styled(RedButton)`
width: 150px;
height: 30px;
`;


function ListCases(props) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    props.dispatch(casesFunction());
  }, []);

  const searchButtonHandler = (e) => {
    e.preventDefault();
    const query = {
      title: search,
    };
    props.dispatch(searchCasesFunction(query));
  };

  const setSearchHandler = (e) => {
    setSearch(e.target.value);
  };

  const addCaseHandler = (e) => {
    e.preventDefault();
    props.history.push('/cases/add/');
  };

  return (
      <Container>
        <SearchInput name="search" onChange={setSearchHandler} value={search} />
        <SearchButton onClick={searchButtonHandler}>Search</SearchButton>
        {props.cases
          ? props.cases.map(cases => {
              return (
                <div key={cases.id}>
                  <div>title {cases.title}</div>
                  <div>status: {cases.status}</div>
                  <div>assigned partner(s): {cases.assigned_partners.map((partner) => {
                    return (
                        <>{partner.name} </>
                    )
                  })}</div>
                </div>
              );
            })
          : null}
        <AddCaseButton onClick={addCaseHandler}>Add Case</AddCaseButton>
      </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    cases: state.cases,
  };
};

export default connect(mapStateToProps)(ListCases);
