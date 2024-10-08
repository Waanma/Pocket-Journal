import { FavoriteItemProps } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-color: rgba(149, 165, 166, 0.5);
  border-bottom-width: 2px;
`;
const ContentContainer = styled.View`
  width: 90%;
`;
const TitleContainer = styled.View`
  flex-direction: column;
  padding: 5px;
  gap: 3px;
`;
const StyledText = styled.Text<{
  date?: boolean;
  title?: boolean;
  content?: boolean;
}>`
  ${(props) => props.title && "font-weight: bold"}
  ${(props) => props.date && "font-size: 12px; color: #5a5a5a"}
  ${(props) => props.content && "font-size: 14px; padding: 5px"}
`;
const IconContainer = styled.View``;

const FavoriteCard = ({ item, onRemove }: FavoriteItemProps) => {
  const onHandlePress = () => {
    router.push({
      pathname: "/newSheet",
      params: {
        id: item.id,
        title: item.title,
        content: item.content,
        createdAt: item.createdAt,
      },
    });
  };
  return (
    <TouchableOpacity onPress={onHandlePress}>
      <Container>
        <ContentContainer>
          <TitleContainer>
            <StyledText title>{item.title}</StyledText>
            <StyledText date>{item.createdAt}</StyledText>
          </TitleContainer>
          <StyledText numberOfLines={2} content>
            {item.content}
          </StyledText>
        </ContentContainer>
        <IconContainer>
          <TouchableOpacity onPress={() => onRemove(item.id)}>
            <Ionicons name="trash" size={30} color={"#c70000"} />
          </TouchableOpacity>
        </IconContainer>
      </Container>
    </TouchableOpacity>
  );
};

export default FavoriteCard;
