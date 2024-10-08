import styled from "styled-components/native";
import { Fontisto } from "@expo/vector-icons";
import { IsSheet } from "@/types/types";
import { useRouter } from "expo-router";
import useStore from "@/store/store";

const Container = styled.TouchableOpacity`
  width: 95%;
  height: 70px;
  border-color: rgba(149, 165, 166, 0.5);
  border-bottom-width: 2px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ContentContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 85%;
  padding: 5px;
`;
const AddButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;
const StyledText = styled.Text``;

interface CardSheetProps {
  sheet: IsSheet;
}

const CardSheet: React.FC<CardSheetProps> = ({ sheet }) => {
  const router = useRouter();
  const { addFavorite } = useStore();
  const handleEdit = () => {
    router.push({
      pathname: "/newSheet",
      params: {
        id: sheet.id,
        title: sheet.title,
        content: sheet.content,
        createdAt: sheet.createdAt,
      },
    });
  };
  const handleAdd = () => {
    addFavorite(sheet.id, sheet.title, sheet.content, sheet.createdAt);
  };
  return (
    <Container onPress={handleEdit}>
      <ContentContainer>
        <StyledText>{sheet.title}</StyledText>
        <StyledText>{sheet.createdAt}</StyledText>
      </ContentContainer>
      <AddButton onPress={handleAdd}>
        <Fontisto name="favorite" size={24} color="#BDBDBD" />
      </AddButton>
    </Container>
  );
};

export default CardSheet;
