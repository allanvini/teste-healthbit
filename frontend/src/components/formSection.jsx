import styled from "styled-components";

export default function FormSection({ title, children }) {
    return (
        <Container>
            <Header>
                <p>{title}</p>

            </Header>
            <FormBody>
                {children}
            </FormBody>
        </Container>

    )
}

const Container = styled.div`
    width: 100%;
    margin-top: 10px;
`

const Header = styled.div`
    padding: 0 10px 0 10px;
    font-weight: 500;
    color: rgb(67,64,72);
    border: 1px solid rgb(189, 189, 189);
    background-color: rgb(245,245,245);
    border-radius: 5px 5px 0 0;
`

const FormBody = styled.div`
    border: 1px solid rgb(189, 189, 189);
    border-top: none;
    background-color: white;
    padding: 10px;
    border-radius:0 0 5px 5px;
`