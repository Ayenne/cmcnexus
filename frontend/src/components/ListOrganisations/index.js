import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { organisationsFunction } from "../../store/actions/Organisations/organisationsAction";
import {
  searchNameFunction,
  searchTagFunction,
} from "../../store/actions/Organisations/searchOrganisationsAction";
import { RedButton } from "../../styles/Buttons";
import { setNavigationAction } from "../../store/actions/Navigation";
import { ORGANISATIONS } from "../Navigation/states";
import { ADD_ORGANISATION } from "../Permissions/permissions";
import CanI from "../Permissions";
import { categoriesFunction } from "../../store/actions/Categories/categoriesAction";
import { useHistory } from "react-router-dom";
import {
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableHeaderRow,
  TableHeaderWrapper,
  TableRow,
} from "../../styles/Tables";
import {
  SearchContainer,
  SearchWrapper,
  SearchInput,
  SearchButton,
  Filter,
  Card,
  Wrapper,
  Clear,
} from "../ListCases/styles";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ebebeb;
  padding: 25px 50px 50px 50px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;

const AddOrganisation = styled.div`
  font-size: 16px;
  margin-bottom: 25px;
  color: red;
  :hover {
    text-decoration: underline;
    cursor: pointer;
    font-weight: bold;
  }
`;

function ListOrganisations(props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const dispatch = props.dispatch;
  const history = useHistory();

  useEffect(() => {
    dispatch(setNavigationAction(ORGANISATIONS));
    dispatch(organisationsFunction());
    dispatch(categoriesFunction());
  }, [dispatch]);

  const organisationDetailsHandler = (id) => {
    history.push({
      pathname: `/organisations/details/${id}/`,
    });
  };

  const headers = ["Name", "Category", "Tag"];

  useEffect(() => {
    dispatch(setNavigationAction(ORGANISATIONS));
    dispatch(organisationsFunction());
    dispatch(categoriesFunction());
  }, [dispatch]);

  const searchButtonHandler = (e) => {
    e.preventDefault();
    if (name) {
      const query = {
        name: name,
      };
      props.dispatch(searchNameFunction(query));
    }
    if (tag) {
      const query = {
        tag: tag,
      };
      props.dispatch(searchTagFunction(query));
    }
  };

  const addOrganisationHandler = (e) => {
    e.preventDefault();
    props.history.push("/organisations/add/");
  };

  const clearSearchHandler = () => {
    window.location.reload();
  };

  return (
    <Container>
      <CanI perform={ADD_ORGANISATION}>
        <AddOrganisation onClick={addOrganisationHandler}>
          ADD ORGANISATION
        </AddOrganisation>
      </CanI>
      <SearchContainer>
        <SearchWrapper>
          <Card>
            Title
            <SearchInput
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Card>
          <Card>
            Category
            <Filter
              defaultValue={"default"}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="default" disabled>
                Choose here
              </option>
              {props.categories
                ? props.categories.map((category) => {
                    return (
                      <option key={category.id} id={category.id}>
                        {category.name}
                      </option>
                    );
                  })
                : null}
            </Filter>
          </Card>
          <Card>
            Tag
            <Filter
              defaultValue={"default"}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="default" disabled>
                Choose here
              </option>
              {props.organisations
                ? props.organisations.map((organisation) => {
                    return (
                      <option key={organisation.id}>{organisation.tag}</option>
                    );
                  })
                : null}
            </Filter>
          </Card>
        </SearchWrapper>
        <Wrapper>
          <SearchButton onClick={searchButtonHandler}>
            APPLY FILTERS
          </SearchButton>
          <Clear onClick={clearSearchHandler}>CLEAR</Clear>
        </Wrapper>
      </SearchContainer>
      <Table>
        <TableHeaderWrapper>
          <TableHeaderRow>
            {headers.map((header, id) => {
              return <TableHeader key={id}>{header}</TableHeader>;
            })}
          </TableHeaderRow>
        </TableHeaderWrapper>
        <TableBody>
          {props.organisations
            ? props.organisations
                .filter(
                  (organisation) =>
                    !category ||
                    organisation.categories.some((cat) => cat.name === category)
                )
                .map((organisation) => (
                  <TableRow
                    key={organisation.id}
                    onClick={() => organisationDetailsHandler(organisation.id)}
                  >
                    <TableData>{organisation.name}</TableData>
                    <TableData>
                      {organisation.categories
                        ? organisation.categories.map((category) => {
                            return <div key={category.id}>{category.name}</div>;
                          })
                        : []}
                    </TableData>
                    <TableData>{organisation.tag}</TableData>
                  </TableRow>
                ))
            : null}
        </TableBody>
      </Table>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations,
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(ListOrganisations);
