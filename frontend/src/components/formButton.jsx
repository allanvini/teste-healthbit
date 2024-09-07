import styled from "styled-components";

export default function FormButton({children, onClick, type = "primary", style = {}}){
    return (
        <Button onClick={onClick} style={{
            ...style, 
            ...type == 'secundary' ? {backgroundColor: '#FFF', color: 'black', borderColor: '#afafaf'} : {}
            }}
            >
            {children}
        </Button>
    )
}

const Button = styled.button`
    border: 1px solid #8181ff;
    padding: 10px;
    border-radius: 5px;
    background-color: #8181ff;
    color: white;
    cursor: pointer;
    font-weight: bold;
`