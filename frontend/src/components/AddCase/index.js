import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import countryList from "react-select-country-list";
import { connect } from "react-redux";
import { categoriesFunction } from "../../store/actions/Categories/categoriesAction"
import { addCaseFunction } from "../../store/actions/Cases/addCaseAction";
import { setNavigationAction } from "../../store/actions/Navigation";
import { CASES_ADD } from "../Navigation/states";
import {Label, Label50} from "../AddOrganisation/styles";
import {AddButton, RedAddText} from "../../styles/Buttons";
import { CategoryDropdown, BasicDropdown } from "../../styles/Dropdowns";
import {Container, DetailsContainer, HeaderTitle, HeaderTitleWrapper} from "../../styles/BaseContainer";
import { FieldInput, FieldInputLarge } from "../../styles/Inputs";
import ExampleCase from "../Examples/case1";
import {Empty} from "../../styles/GenericBoxes";
import CanI from "../Permissions";
import {Horizontal} from "../CaseDetails/styles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px 0;
`;

const ErrorMessage = styled.div`
  font-size: 10px;
  color: red;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Text = styled.div`
  color: black;
`;

const HorizontalWrap = styled(Horizontal)`
flex-wrap: wrap;
`;

const BasicDropdown50 = styled(BasicDropdown)`
width: 100%;
min-width: 160px;
`;

function AddCase(props) {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [nature_of_referral, setNatureOfReferral] = useState("");
  const [patient_id, setPatientId] = useState("");
  const [description, setDescription] = useState("");
  const [history_description, setHistoryDescription] = useState("");
  const [past_medical_history, setMedicalHistory] = useState("");
  const [physical_examination, setPhysicalExamination] = useState("");
  const [investigations, setInvestigations] = useState("");
  const [current_treatment, setCurrentTreatment] = useState("");
  const [justification, setJustification] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [consent, setConsent] = useState(false);
  const [birth_date, setBirthDate] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const countries = countryList().getData();
  const [country, setCountry] = useState("default");
  const [categories, setCategories] = useState(["default"]);
  const [categoryIds, setCategoryIds] = useState([]);

  const [titleError, setTitleError] = useState("");
  const [consentError, setConsentError] = useState("");
  const [sexError, setSexError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = props.dispatch;

  useEffect(() => {
    dispatch(categoriesFunction());
    dispatch(setNavigationAction(CASES_ADD));
  }, [dispatch]);

  const setCategoryHandler = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    setCategories(selectedOptions.map((option) => option.value));
    setCategoryIds(selectedOptions.map((option) => option.id));
  };

  const fillExampleCase = () => {
      setTitle(ExampleCase["Title"]);
      setPatientId(ExampleCase["Patient ID"]);
      setLanguage(ExampleCase["Language"]);
      setNatureOfReferral(ExampleCase["Nature of referral"]);
      setAge(ExampleCase["Age"]);
      setSex(ExampleCase["Sex"]);
      setCategoryIds([ExampleCase["Category"].id]);
      setCategories([ExampleCase["Category"].name]);
      setConsent(ExampleCase["Consent"]);
      setCountry(ExampleCase["Country"]);
      setDescription(ExampleCase["Presenting complaint"]);
      setHistoryDescription(ExampleCase["History of presenting complaint"]);
      setPhysicalExamination(ExampleCase["Physical examination"]);
      setInvestigations(ExampleCase["Investigations"]);
  }

  const validate = () => {
    let titleError = "";
    let consentError = "";
    let sexError = "";
    let countryError = "";
    let categoriesError = "";

    if (!title) {
      titleError = "Title cannot be blank";
    }
    if (!consent) {
      consentError = "The patient must consent";
    }
    if (!sex) {
      sexError = "Sex must be disclosed";
    }
    if (!country) {
      countryError = "A country must be selected";
    }
    if (!categories) {
      categoriesError = "At least one category must be chosen";
    }

    if (
      titleError ||
      consentError ||
      sexError ||
      countryError ||
      categoriesError
    ) {
      setTitleError(titleError);
      setConsentError(consentError);
      setSexError(sexError);
      setCountryError(countryError);
      setCategoriesError(categoriesError);
      return false;
    }
    return true;
  };

  const addCaseHandler = async (e) => {
    setLoading(true);
    const isValid = validate();
    if (isValid) {
      const data = {
        title: title,
        language: language,
        nature_of_referral: nature_of_referral,
        patient_id: patient_id,
        description: description,
        history_description: history_description,
        past_medical_history: past_medical_history,
        physical_examination: physical_examination,
        investigations: investigations,
        current_treatment: current_treatment,
        justification: justification,
        recommendation: recommendation,
        consent: consent,
        birth_date: birth_date,
        age: age,
        sex: sex,
        country: country,
        categories: categoryIds,
      };
      await dispatch(addCaseFunction(data, props.history));
    }
    setLoading(false);
  };

  return (
    <Container>
      <HeaderTitleWrapper>
        <HeaderTitle>Add case</HeaderTitle>
        <Empty/>
        <RedAddText onClick={fillExampleCase}>+ Form Magic</RedAddText>
      </HeaderTitleWrapper>
      <DetailsContainer>
        <Label>
          Title
          <FieldInput
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
          <ErrorMessage>{titleError}</ErrorMessage>
        </Label>

      <Horizontal>
          <div>
        <Label>
          Category
          <CategoryDropdown
            value={categories}
            onChange={setCategoryHandler}
            multiple
          >
            {/*<option value="default" disabled>--Select--</option>*/}
            {props.categories
              ? props.categories.filter((c) => c.id !== 0).map((category) => {
                  return (
                    <option key={category.id} id={category.id}>
                      {category.name}
                    </option>
                  );
                })
              : null}
          </CategoryDropdown>
        </Label>
        <ErrorMessage>{categoriesError}</ErrorMessage>
              </div>

      <HorizontalWrap>
        <Label50>Language
        <BasicDropdown50
          name="language"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
          required
        >
          <option value="" disabled>--Select--</option>
          <option key={1}>French</option>
          <option key={2}>English</option>
          <option key={3}>Spanish</option>
        </BasicDropdown50>
        </Label50>
        <Label50>Nature of Referral
        <BasicDropdown50
          name="nature_of_referral"
          onChange={(e) => setNatureOfReferral(e.target.value)}
          value={nature_of_referral}
          required
        >
          <option value="" disabled>--Select--</option>
          <option key={1}>Life changing</option>
          <option key={2}>Emergency</option>
          <option key={3}>Urgent</option>
        </BasicDropdown50>
        </Label50>

      <Label50>Sex
      <BasicDropdown50
        name="sex"
        onChange={(e) => setSex(e.target.value)}
        value={sex}
        required
      >
          <option value="" disabled>--Select--</option>
          <option key={1}>F</option>
          <option key={2}>M</option>
      </BasicDropdown50>
      </Label50>
      <ErrorMessage>{sexError}</ErrorMessage>
      <Label50>Country
      <BasicDropdown50 value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="default" disabled>--Select--</option>
          {countries
          ? countries.map((country) => {
              return (
                <option key={country.value}>{country.label}</option>
              );
            })
          : null
          }
      </BasicDropdown50>
      <ErrorMessage>{countryError}</ErrorMessage>
        </Label50>
        </HorizontalWrap>
      </Horizontal>

      <Horizontal>
        <Label>Patient ID
        <FieldInput
          name="patient_id"
          type="number"
          onChange={(e) => setPatientId(e.target.value)}
          value={patient_id}
          min="0"
          required
      />
      </Label>
      <Label>Birth date
      <FieldInput
        name="birth_date"
        type="text"
        onChange={(e) => setBirthDate(e.target.value)}
        value={birth_date}
      />
      </Label>
      <Label>Age
      <FieldInput
        name="age"
        type="number"
        onChange={(e) => setAge(e.target.value)}
        value={age}
        min="0"
      />
      </Label>
      </Horizontal>
      <Label>Patient's consent
          <Wrapper>
            <Checkbox
              type="checkbox"
              name="consent"
              onChange={() => setConsent(!consent)}
              checked={consent}
            />
            <Text>
              By ticking this box, I confirm that informed consent has been
              obtained from the patient.
            </Text>
          </Wrapper>
          <ErrorMessage>{consentError}</ErrorMessage>
      </Label>
      <Label>Presenting Complaint
      <FieldInputLarge
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        required
      />
      </Label>
      <Label>History of Presenting Complaint
      <FieldInputLarge
        name="history_description"
        onChange={(e) => setHistoryDescription(e.target.value)}
        value={history_description}
      />
      </Label>
      <Label>Past medical history
      <FieldInputLarge
        name="past_medical_history"
        onChange={(e) => setMedicalHistory(e.target.value)}
        value={past_medical_history}
      />
      </Label>
      <Label>Physical examination
      <FieldInputLarge
        name="physical_examination"
        onChange={(e) => setPhysicalExamination(e.target.value)}
        value={physical_examination}
      />
      </Label>
      <Label>Investigations
      <FieldInputLarge
        name="investigations"
        onChange={(e) => setInvestigations(e.target.value)}
        value={investigations}
      />
      </Label>
      <Label>Current treatment
      <FieldInputLarge
        name="current_treatment"
        onChange={(e) => setCurrentTreatment(e.target.value)}
        value={current_treatment}
      />
      </Label>
      <Label>Justification
      <FieldInputLarge
        name="justification"
        onChange={(e) => setJustification(e.target.value)}
        value={justification}
      />
      </Label>
      <Label>Recommendation
      <FieldInputLarge
        name="recommendation"
        onChange={(e) => setRecommendation(e.target.value)}
        value={recommendation}
      />
      </Label>

      </DetailsContainer>
      <AddButton onClick={addCaseHandler}>
          {loading ? <ClipLoader size={18} color={"white"} /> :  "SUBMIT"}
      </AddButton>
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
