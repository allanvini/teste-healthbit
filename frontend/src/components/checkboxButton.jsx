import styled from "styled-components";

export default function CheckboxButton({label, onChange, checked, id}){
    return (
        <OptionWrapper id={id}>
            <Checkbox type='checkbox' checked={checked} onChange={onChange} />
            <label>{label}</label>
        </OptionWrapper>
    )
}

const OptionWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`

const Checkbox = styled.input`
    width: 18px;
    height: 18px;
    margin: 0;
`