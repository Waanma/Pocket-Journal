import styled from "styled-components/native";
import DarkModeButton from "./darkModeButton";

const Container = styled.View``;
const Content = styled.View`
  align-items: flex-end;
  height: 50px;
  background-color: green;
`;
const DarkModeContainer = styled.View`
  background-color: green;
  align-items: center;
  justify-content: center;
`;

const Header = () => {
  return (
    <Container>
      <Content>
        <DarkModeContainer>
          <DarkModeButton/>
        </DarkModeContainer>
      </Content>
    </Container>
  );
};

export default Header;
