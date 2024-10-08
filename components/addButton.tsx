import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

const StyledLinkContainer = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 100px;
    background-color: ${Colors.light.secondary};
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
`;
const ButtonContainer = styled.View`
`;

const AddButton = () => {
  return (
    <StyledLinkContainer>
      <Link href={"/newSheet"}>
        <ButtonContainer>
          <MaterialCommunityIcons name="plus" size={30} color="#000" />
        </ButtonContainer>
      </Link>
    </StyledLinkContainer>
  );
};

export default AddButton;
