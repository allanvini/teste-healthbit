import styled from "styled-components";

export default function DropDownSelector({label, onChange, children, disabled, id, value}){
    return (
        <FieldWrapper style={{...{opacity: disabled ? 0.5 : 1}}}>
            <Label style={{...{opacity: disabled ? 0.5 : 1}}}>{label}</Label>
            <OptionsWrapper disabled={disabled} onChange={onChange} id={id} value={value}>
                {children}
            </OptionsWrapper>
        </FieldWrapper>
    )
}

const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0 10px 0;
`

const OptionsWrapper = styled.select`
    border: 2px solid #d5d5d5;
    border-radius: 3px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    &:focus{
        outline: none;
    }
`

const Label = styled.label`
    font-weight: 500;
`