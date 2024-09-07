import React from "react";
import styled from "styled-components";

export default function RadioOptionSelector({label, value, onChange, children, id}){
    return (
        <FieldWrapper id={id}>
            <Label>{label}</Label>
            {
                React.Children.map(children, child => {
                    if(React.isValidElement(child)){
                        return (
                            <OptionWrapper>
                                {
                                    React.cloneElement(child, {
                                        checked: value === child.props.value,
                                        onChange: onChange
                                    })
                                }
                                <OptionLabel>{child.props.name}</OptionLabel>
                            </OptionWrapper>
                        )
                    }
                })
            }
        </FieldWrapper>
    )
}

const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0 10px 0;
    gap: 5px;
    input {
        width: 18px;
        height: 18px;
        margin: 0;
    }
`

const Label = styled.label`
    font-weight: 500;
`

const OptionLabel = styled.label`
    font-size: 12px;
`

const OptionWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`