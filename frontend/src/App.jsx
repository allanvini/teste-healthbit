import { useState, useEffect } from 'react';
import { notify, ToastManager } from './components/informtionCard';
import { validatePage1, validatePage2, validatePage3 } from './utils/validator';
import { getFoodCategories, getFoodTypesByCategory, sendForm } from './services/api';
import { formatFormForSubmission } from './utils/formatter';


import ContentContainer from './components/contentContainer';
import InputField from './components/inputField';
import DropDownSelector from './components/dropDownSelector';
import RadioOptionSelector from './components/radioOptionSelector';
import CheckboxOptionSelector from './components/checkboxOptionSelector';
import DatePicker from './components/datePicker';
import CheckboxButton from './components/checkboxButton';
import FormSection from './components/formSection';
import FormButton from './components/formButton';
import FormButtonContainer from './components/formButtonContainer';
import GridOrganizer from './components/gridOrganizer';



function App() {

  const [formPage, setFormPage] = useState(0);

  const [fullName, setFullName] = useState("")
  const [cpf, setCpf] = useState("")
  const [position, setPosition] = useState("")
  const [city, setCity] = useState("");
  const [state, setState] = useState();

  const [areDataCorrect, setAreDataCorrect] = useState();

  const [ownership, setOwnership] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(() => {
    let startingDate = new Date()
    startingDate.setFullYear(startingDate.getFullYear() - 1);
    return startingDate.toLocaleDateString();
  });
  const [biologicalGender, setBiologicalGender] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  const [systolicBloodPressure, setSystolicBloodPressure] = useState("");
  const [diastolicBloodPressure, setDiastolicBloodPressure] = useState("");
  const [dontKnowBloodPressure, setDontKnowBloodPressure] = useState(false);

  const [diabetes, setDiabetes] = useState([]);
  const [hearthProblems, setHearthProblems] = useState([]);
  const [highPressure, setHighPressure] = useState([]);
  const [asthma, setAsthma] = useState([]);
  const [depression, setDepression] = useState([]);
  const [anxiety, setAnxiety] = useState([]);
  const [highCholesterol, setHighCholesterol] = useState([]);
  const [backPain, setBackPain] = useState([]);
  const [jointPain, setJointPain] = useState([]);
  const [headPain, setHeadPain] = useState([]);
  const [cancer, setCancer] = useState([]);
  const [std, setStd] = useState([]);
  const [others, setOthers] = useState("");

  const [foodCategories, setFoodCategories] = useState([]);
  const [selectedFoodCategory, setSelectedFoodCategory] = useState();
  const [foodTypes, setFoodTypes] = useState([]);
  const [markedFoodTypes, setMarkedFoodTypes] = useState([]);


  useEffect(()=>{
    fetchFoodCategories();
  },[])

  useEffect(()=>{
    fetchFoodTypes();
  },[selectedFoodCategory, setSelectedFoodCategory])

  async function fetchFoodCategories(){
    let results = await getFoodCategories();
    setFoodCategories(results);
    setSelectedFoodCategory(results[0].id);
    await fetchFoodTypes(results[0].id)
  }

  async function fetchFoodTypes(){
    let results = await getFoodTypesByCategory(selectedFoodCategory);
    console.log(results);
    setFoodTypes(results);
    setMarkedFoodTypes([]);
  }

  function setErrors(errors){
    errors.forEach(fieldId=>{
      let erroredItem = document.getElementById(fieldId.id)
      erroredItem.style.border = '3px solid red';
      erroredItem.style.borderRadius = '3px';
      notify({
        title: fieldId.title,
        message: fieldId.message,
        type: 'error',
        duration: 5
      })
    })
    
  }

  function passPage1() {
  
    const fields = {
      fullName,
      cpf,
      position,
      city,
      state,
      areDataCorrect,
      ownership,
      phone,
      email,
      birthday,
      biologicalGender,
      weight,
      height,
      systolicBloodPressure,
      diastolicBloodPressure,
      dontKnowBloodPressure
    }

    let errorsIds = validatePage1(fields)

    if (errorsIds.length > 0) {
      setErrors(errorsIds);
      return;
    }

    setFormPage(formPage + 1);
  }

  function passPage2(){

    const fields = {
      diabetes,
      hearthProblems,
      highPressure,
      asthma,
      depression,
      anxiety,
      highCholesterol,
      backPain,
      jointPain,
      headPain,
      cancer,
      std
    }

    let errorsIds = validatePage2(fields)

    if (errorsIds.length > 0) {
      setErrors(errorsIds);
      return;
    }
    setFormPage(formPage + 1);
  }

  async function submitForm(){
    const errorIds = validatePage3({markedFoodTypes});

    if(errorIds.length>0){
      setErrors(errorIds);
      return;
    }

    const fullFields = {
      fullName,
      cpf,
      position,
      city,
      state,
      ownership,
      phone,
      email,
      birthday,
      biologicalGender,
      weight,
      height,
      systolicBloodPressure,
      diastolicBloodPressure,
      dontKnowBloodPressure,
      diabetes,
      hearthProblems,
      highPressure,
      asthma,
      depression,
      anxiety,
      highCholesterol,
      backPain,
      jointPain,
      headPain,
      cancer,
      std,
      others,
      selectedFoodCategory,
      markedFoodTypes
    }

    const formattedForm = formatFormForSubmission(fullFields)

    const response = await sendForm(formattedForm)

    console.log(response)

    if(response.success){
      notify({
        title: "Sucesso!",
        message: "Seu formulário foi registrado!",
        type: 'info',
        duration: 5
      })
    } else {
      Object.entries(response.errors).forEach(([field, message]) => {
        notify({
          title: "Erro",
          message: message,
          type: 'error',
          duration: 5
        });
      });
    }

  }

  return (
    <>
    <ToastManager />
      {
        formPage == 0 &&
        <ContentContainer>
          <InputField
            id="fullName"
            label="Nome completo"
            value={fullName}
            onChange={(newValue) => setFullName(newValue)}
          />

          <InputField
            id="cpf"
            label="Matrícula/CPF"
            value={cpf}
            onChange={(newValue) => setCpf(newValue)}
            mask="000.000.000-00"
          />

          <InputField
            id="position"
            label="Cargo"
            value={position}
            onChange={(newValue) => setPosition(newValue)}
          />

          <InputField
            id="city"
            label="Cidade"
            value={city}
            onChange={(newValue) => setCity(newValue)}
          />

          <DropDownSelector
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            label="Estado"
          >
            <option defaultChecked disabled label='-- Nenhum --' />
            <option value="AC" label='AC' />
            <option value="AL" label='AL' />
            <option value="AM" label='AM' />
            <option value="AP" label='AP' />
            <option value="BA" label='BA' />
            <option value="CE" label='CE' />
            <option value="DF" label='DF' />
            <option value="ES" label='ES' />
            <option value="GO" label='GO' />
            <option value="MA" label='MA' />
            <option value="MG" label='MG' />
            <option value="MS" label='MS' />
            <option value="MT" label='MT' />
            <option value="PA" label='PA' />
            <option value="PB" label='PB' />
            <option value="PE" label='PE' />
            <option value="PI" label='PI' />
            <option value="PR" label='PR' />
            <option value="RJ" label='RJ' />
            <option value="RN" label='RN' />
            <option value="RO" label='RO' />
            <option value="RR" label='RR' />
            <option value="RS" label='RS' />
            <option value="SC" label='SC' />
            <option value="SE" label='SE' />
            <option value="SP" label='SP' />
            <option value="TO" label='TO' />
          </DropDownSelector>

          <RadioOptionSelector id="areDataCorrect" value={areDataCorrect} label="Os dados acima estão corretos?" onChange={(e) => setAreDataCorrect(e.target.value)}>
            <input type="radio" value="Y" name='Sim' />
            <input type="radio" value="N" name='Não' />
          </RadioOptionSelector>

          <RadioOptionSelector id="ownership" value={ownership} label="Titularidade" onChange={(e) => setOwnership(e.target.value)}>
            <input type="radio" value="Titular" name='Titular' />
            <input type="radio" value="Dependente" name='Dependente' />
          </RadioOptionSelector>

          <InputField
            id="phone"
            label="Telefone com DDD"
            value={phone}
            onChange={(newValue) => setPhone(newValue)}
            mask="(00) 00000-0000"
          />

          <InputField
            id="email"
            label="E-mail"
            value={email}
            onChange={(newValue) => setEmail(newValue)}
            type="email"
          />

          <DatePicker id="birthday" label="Data de nascimento" value={birthday} onChange={(newDate) => setBirthday(newDate)} />

          <RadioOptionSelector id="biologicalGender" value={biologicalGender} label="Sexo biológico" onChange={(e) => setBiologicalGender(e.target.value)}>
            <input type="radio" value="Masculino" name='Masculino' />
            <input type="radio" value="Feminino" name='Feminino' />
          </RadioOptionSelector>


          <InputField
            id="weight"
            label="Peso"
            value={weight}
            onChange={(newValue) => setWeight(newValue)}
            type="number"
          />

          <InputField
            id="height"
            label="Altura"
            value={height}
            onChange={(newValue) => setHeight(newValue)}
            type="number"
          />

          <FormSection title="Pressão Arterial">
            <DropDownSelector id="systolicBloodPressure" label="Pressão sistólica (máxima)" value={systolicBloodPressure} onChange={(e) => { setSystolicBloodPressure(e.target.value) }} disabled={dontKnowBloodPressure}>
              <option defaultChecked disabled label='-- Nenhum --' />
              <option value="Menor que 120" label='Menor que 120' />
              <option value="De 120 a 129" label='De 120 a 129' />
              <option value="De 130 a 139" label='De 130 a 139' />
              <option value="De 140 a 159" label='De 140 a 159' />
              <option value="De 160 a 179" label='De 160 a 179' />
              <option value="180 ou maior" label='180 ou maior' />
            </DropDownSelector>
            <DropDownSelector id="diastolicBloodPressure" label="Pressão diastólica (mínima)" value={diastolicBloodPressure} onChange={(e) => { setDiastolicBloodPressure(e.target.value) }} disabled={dontKnowBloodPressure}>
              <option defaultChecked disabled label='-- Nenhum --' />
              <option value="De 120 a 129" label='De 120 a 129' />
              <option value="De 130 a 139" label='De 130 a 139' />
              <option value="De 140 a 159" label='De 140 a 159' />
              <option value="De 160 a 179" label='De 160 a 179' />
              <option value="180 ou maior" label='180 ou maior' />
            </DropDownSelector>
            <CheckboxButton
              checked={dontKnowBloodPressure}
              onChange={() => {
                setDontKnowBloodPressure(!dontKnowBloodPressure)
                if (!dontKnowBloodPressure) {
                  setSystolicBloodPressure("");
                  setDiastolicBloodPressure("");
                }
              }}
              label="Não sei"
            />
          </FormSection>
          <FormButtonContainer>
            <FormButton type='secundary' onClick={passPage1}>
              Próximo
            </FormButton>
          </FormButtonContainer>
        </ContentContainer>
      }

      {
        formPage == 1 &&
        <ContentContainer>
          <FormSection title="Preencha apenas as doenças que você tem ou já teve">

            <GridOrganizer>

              <CheckboxOptionSelector values={diabetes} id="diabetes" label="Diabetes" onChange={(e) => {
                let tempArr = [...diabetes]
                const { value } = e.target
                if (tempArr.includes(value)) tempArr.splice(tempArr.indexOf(value), 1);
                else tempArr.push(value);
                console.log(tempArr)
                setDiabetes(tempArr)
              }}>
                <input type='checkbox' value="Tenho" name="Tenho" />
                <input  type='checkbox' value="Não tenho" name="Não tenho" />
                <input  type='checkbox' value="Não sei" name="Não sei" />
              </CheckboxOptionSelector>

              <CheckboxOptionSelector values={hearthProblems} id="hearthProblems" label="Problemas Cardíacos" onChange={(e) => {
                let tempArr = [...hearthProblems]
                const { value } = e.target
                if (tempArr.includes(value)) tempArr.splice(tempArr.indexOf(value), 1);
                else tempArr.push(value);
                console.log(tempArr)
                setHearthProblems(tempArr)
              }}>
                <input type='checkbox' value="Tenho" name="Tenho" />
                <input type='checkbox' value="Não tenho" name="Não tenho" />
                <input type='checkbox' value="Já tive, mas me curei" name="Já tive, mas me curei" />
              </CheckboxOptionSelector>

              <CheckboxOptionSelector values={highPressure} id="highPressure" label="Pressão Alta" onChange={(e) => {
                let tempArr = [...highPressure]
                const { value } = e.target
                if (tempArr.includes(value)) tempArr.splice(tempArr.indexOf(value), 1);
                else tempArr.push(value);
                console.log(tempArr)
                setHighPressure(tempArr)
              }}>
                <input type='checkbox' value="Tenho" name="Tenho" />
                <input type='checkbox' value="Não tenho" name="Não tenho" />
                <input type='checkbox' value="Náo sei" name="Náo sei" />
              </CheckboxOptionSelector>

              <CheckboxOptionSelector values={asthma} id="asthma" label="Asma" onChange={(e) => {
                let tempArr = [...asthma]
                const { value } = e.target
                if (tempArr.includes(value)) tempArr.splice(tempArr.indexOf(value), 1);
                else tempArr.push(value);
                console.log(tempArr)
                setAsthma(tempArr)
              }}>
                <input type='checkbox' value="Tenho" name="Tenho" />
                <input type='checkbox' value="Não tenho" name="Não tenho" />
                <input type='checkbox' value="Náo sei" name="Náo sei" />
              </CheckboxOptionSelector>

              <CheckboxOptionSelector values={depression} id="depression" label="Depressáo" onChange={(e) => {
                let tempArr = [...depression]
                const { value } = e.target
                if (tempArr.includes(value)) tempArr.splice(tempArr.indexOf(value), 1);
                else tempArr.push(value);
                console.log(tempArr)
                setDepression(tempArr)
              }}>
                <input type='checkbox' value="Tenho" name="Tenho" />
                <input type='checkbox' value="Não tenho" name="Não tenho" />
              </CheckboxOptionSelector>

              <CheckboxOptionSelector values={anxiety} id="anxiety" label="Ansiedade" onChange={(e) => {
                let tempArr = [...anxiety]
                const { value } = e.target
                if (tempArr.includes(value)) tempArr.splice(tempArr.indexOf(value), 1);
                else tempArr.push(value);
                console.log(tempArr)
                setAnxiety(tempArr)
              }}>
                <input type='checkbox' value="Tenho" name="Tenho" />
                <input type='checkbox' value="Não tenho" name="Não tenho" />
              </CheckboxOptionSelector>

              <CheckboxOptionSelector values={highCholesterol} id="highCholesterol" label="Colesterol Alto" onChange={(e) => {
                let tempArr = [...highCholesterol]
                const { value } = e.target
                if (tempArr.includes(value)) tempArr.splice(tempArr.indexOf(value), 1);
                else tempArr.push(value);
                console.log(tempArr)
                setHighCholesterol(tempArr)
              }}>
                <input type='checkbox' value="Tenho" name="Tenho" />
                <input type='checkbox' value="Não tenho" name="Não tenho" />
                <input type='checkbox' value="Não sei" name="Não sei" />
              </CheckboxOptionSelector>

              <CheckboxOptionSelector values={backPain} id="backPain" label="Dores nas Costas" onChange={(e) => {
                let tempArr = [...backPain]
                const { value } = e.target
                if (tempArr.includes(value)) tempArr.splice(tempArr.indexOf(value), 1);
                else tempArr.push(value);
                console.log(tempArr)
                setBackPain(tempArr)
              }}>
                <input type='checkbox' value="Tenho" name="Tenho" />
                <input type='checkbox' value="Não tenho" name="Não tenho" />
                <input type='checkbox' value="Já tive, mas me curei" name="Já tive, mas me curei" />
              </CheckboxOptionSelector>

              <CheckboxOptionSelector values={jointPain} id="jointPain" label="Dores nas Articulações" onChange={(e) => {
                let tempArr = [...jointPain]
                const { value } = e.target
                if (tempArr.includes(value)) tempArr.splice(tempArr.indexOf(value), 1);
                else tempArr.push(value);
                console.log(tempArr)
                setJointPain(tempArr)
              }}>
                <input type='checkbox' value="Tenho" name="Tenho" />
                <input type='checkbox' value="Não tenho" name="Não tenho" />
                <input type='checkbox' value="Já tive, mas me curei" name="Já tive, mas me curei" />
              </CheckboxOptionSelector>

              <CheckboxOptionSelector values={headPain} id="headPain" label="Dores de Cabeça" onChange={(e) => {
                let tempArr = [...headPain]
                const { value } = e.target
                if (tempArr.includes(value)) tempArr.splice(tempArr.indexOf(value), 1);
                else tempArr.push(value);
                console.log(tempArr)
                setHeadPain(tempArr)
              }}>
                <input type='checkbox' value="Tenho" name="Tenho" />
                <input type='checkbox' value="Não tenho" name="Não tenho" />
                <input type='checkbox' value="Já tive, mas me curei" name="Já tive, mas me curei" />
              </CheckboxOptionSelector>

              <CheckboxOptionSelector values={cancer} id="cancer" label="Câncer" onChange={(e) => {
                let tempArr = [...cancer]
                const { value } = e.target
                if (tempArr.includes(value)) tempArr.splice(tempArr.indexOf(value), 1);
                else tempArr.push(value);
                console.log(tempArr)
                setCancer(tempArr)
              }}>
                <input type='checkbox' value="Tenho" name="Tenho" />
                <input type='checkbox' value="Não tenho" name="Não tenho" />
                <input type='checkbox' value="Já tive, mas me curei" name="Já tive, mas me curei" />
              </CheckboxOptionSelector>

              <CheckboxOptionSelector values={std} id="std" label="Infecções Sexualmente Transmissíveis" onChange={(e) => {
                let tempArr = [...std]
                const { value } = e.target
                if (tempArr.includes(value)) tempArr.splice(tempArr.indexOf(value), 1);
                else tempArr.push(value);
                console.log(tempArr)
                setStd(tempArr)
              }}>
                <input type='checkbox' value="Tenho" name="Tenho" />
                <input type='checkbox' value="Não tenho" name="Não tenho" />
                <input type='checkbox' value="Já tive, mas me curei" name="Já tive, mas me curei" />
              </CheckboxOptionSelector>

            </GridOrganizer>
            
            <InputField
              id="others"
              value={others}
              onChange={newValue=>setOthers(newValue)}
              label="Outros"
              style={{width: "60%"}}
            />

          </FormSection>
          <FormButtonContainer>
            <FormButton type='secundary' onClick={() => { setFormPage(formPage - 1) }}>
              Anterior
            </FormButton>
            <FormButton type='secundary' onClick={passPage2}>
              Próximo
            </FormButton>
          </FormButtonContainer>
        </ContentContainer>
      }

      {
        formPage == 2 &&
        <ContentContainer>
          <DropDownSelector id="foodCategory" label="Selecione seu tipo de alimentação" onChange={(e)=>setSelectedFoodCategory(e.target.value)}>
            {
              foodCategories.map((category, index) => (
                <option key={index} value={category.id} label={category.foodCategory} />
              ))
            }
          </DropDownSelector>
          <CheckboxOptionSelector
            id="markedFoodTypes"
            label="Preencha os tipos de alimento que você consome diariamente::"
            onChange={(e) => {
              let tempArr = [...markedFoodTypes]
              const { value } = e.target
              if (tempArr.includes(value)) tempArr.splice(tempArr.indexOf(value), 1);
              else tempArr.push(value);
              console.log(tempArr)
              setMarkedFoodTypes(tempArr)
            }}
            values={markedFoodTypes}
          >
            {
              foodTypes.map((food, index)=>(
                <input key={index} type='checkbox' value={food.id} name={food.food} />
              ))
            }
          </CheckboxOptionSelector>
          <FormButtonContainer>
            <FormButton type='secundary' onClick={()=>{setFormPage(formPage-1)}}>
              Anterior
            </FormButton>
            <FormButton onClick={submitForm}>
              Enviar
            </FormButton>
          </FormButtonContainer>
        </ContentContainer>
      }

    </>
  )
}

export default App
