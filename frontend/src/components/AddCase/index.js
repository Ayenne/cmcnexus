import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {categoriesFunction} from "../../store/actions/categoriesAction";
import {addCaseFunction} from "../../store/actions/addCaseAction";
import { GreyRoundInput } from "../../styles/Inputs";
import { RedButton } from "../../styles/Buttons";
import { Dropdown } from "../../styles/Dropdowns";


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FieldInput = styled(GreyRoundInput)`
  width: 100px;
  height: 30px;
`;

const Checkbox = styled.input`
  width: 30px;
  height: 30px;
`;

const CategoryDropdown = styled(Dropdown)`
  width: 200px;
  height: 100px;
`;

const AddButton = styled(RedButton)`
  width: 75px;
  height: 30px;
`;


function AddCase(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [justification, setJustification] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [consent, setConsent] = useState(false);
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [country, setCountry] = useState('');
    const [category, setCategory] = useState(null);

    useEffect(() => {
        props.dispatch(categoriesFunction());
    }, [])

    const setCategoryHandler = (e) => {
        if (e.target.value === "Undefined") {
            setCategory(0)
        } else if (e.target.value === "Medical") {
            setCategory(1)
        } else if (e.target.value === "Administrative") {
            setCategory(2)
        } else
            setCategory(3)
    };

    const addCaseHandler = async (e) => {
        const data = {
            title: title,
            description: description,
            diagnosis: diagnosis,
            justification: justification,
            recommendation: recommendation,
            consent: consent,
            age: age,
            sex: sex,
            country: country,
            category: category,
        };
        await props.dispatch(addCaseFunction(data));
        props.history.push("/cases/");
    };

  return (
      <Container>
          <div>
              title:
          </div>
          <FieldInput name="title" onChange={(e) => setTitle(e.target.value)} value={title} required/>
          <div>
              description:
          </div>
          <FieldInput name="description" onChange={(e) => setDescription(e.target.value)} value={description} required/>
          <div>
              diagnosis:
          </div>
          <FieldInput name="diagnosis" onChange={(e) => setDiagnosis(e.target.value)} value={diagnosis} required/>
          <div>
              justification:
          </div>
          <FieldInput name="justification" onChange={(e) => setJustification(e.target.value)} value={justification} required/>
          <div>
              recommendation:
          </div>
          <FieldInput name="recommendation" onChange={(e) => setRecommendation(e.target.value)} value={recommendation} required/>
          <div>
              patient's consent:
          </div>
          <Checkbox type="checkbox" name="consent" onChange={() => setConsent(true)} value="consent"/>
          <div>
              age:
          </div>
          <FieldInput name="age" onChange={(e) => setAge(e.target.value)} value={age} required/>
          <div>
              sex:
          </div>
          <FieldInput name="sex" onChange={(e) => setSex(e.target.value)} value={sex} required/>
          <div>
              country:
          </div>
          <FieldInput name="country" onChange={(e) => setCountry(e.target.value)} value={country} required/>
          <div>
              category:
          </div>
          <CategoryDropdown onChange={setCategoryHandler} multiple="multiple">
              <option>Select a category...</option>
                {props.categories
                    ? props.categories.map( (category) => {
                        return (
                            <option key={category.id} id={category.id}>{category.name}</option>
                        )
                    }): null}
          </CategoryDropdown>
          <AddButton onClick={addCaseHandler}>Add</AddButton>
      </Container>
  );
}

const mapStateToProps = (state) => {
  return {
      cases: state.cases,
      categories: state.categories,
  };
};

export default connect(mapStateToProps)(AddCase);
