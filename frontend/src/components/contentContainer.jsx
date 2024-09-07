import styled from "styled-components";

export default function ContentContainer({children}){
    return (
        <ContainerWrapper>
            <Container>
                {children}
            </Container>
        </ContainerWrapper>
    )
}  

const ContainerWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const Container = styled.div`
    width: 100%;
    max-width: 900px;
    padding: 10px;
`