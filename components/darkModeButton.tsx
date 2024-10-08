import { Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  width: 50px;
`;
const ContentContainer = styled.Pressable`
  align-items: flex-end;
  height: 50px;
  background-color: red;
`;

const DarkModeButton = () => {
  return (
    <Container>
      <ContentContainer>
        <Text>Dark Mode</Text>
      </ContentContainer>
    </Container>
  );
};

export default DarkModeButton;
