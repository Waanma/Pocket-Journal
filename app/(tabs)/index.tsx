import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import SheetList from "@/components/sheetList";
import useStore from "@/store/store";
import { View } from "react-native";
import AddButton from "@/components/addButton";
import HeaderPadding from "@/components/headerPadding";
import Header from "@/components/header";

const Container = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: ${Colors.light.background};
  position: relative;
`;
const TitleContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-top: 15px;
  gap: 10px;
`;
const SheetsContainer = styled.View`
  align-items: center;
  margin-top: 10px;
  width: 100%;
  height: 70%;
`;
const ButtonContainer = styled.View`
  padding: 30px;
  border-radius: 20px;
  flex-direction: column;
  align-items: center;
  background-color: rgba(42, 157, 143, 0.7);
  border-color: rgba(149, 165, 166, 0.5);
  border-bottom-width: 2px;
  border-right-width: 2px;
`;
const StyledTitle = styled.Text`
  font-family: comfortaa;
  font-size: 46px;
`;
const StyledSheetText = styled.Text`
  font-family: StraitRegular;
  font-size: 20px;
  padding-top: 12px;
`;
const StyledLinkContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding-top: 60px;
`;

export default function HomeScreen() {
  const { sheets } = useStore();
  const hasSheets = sheets.length > 0;
  return (
    <Container>
      <HeaderPadding />
      {/* <Header /> */}
      <TitleContainer>
        <View>
          <View>
            <StyledTitle>Pocket</StyledTitle>
          </View>
          <View>
            <StyledTitle>Journal</StyledTitle>
          </View>
        </View>
        <Ionicons name="journal-outline" size={120} color="#000" />
      </TitleContainer>
      <SheetsContainer>
        {!hasSheets ? (
          <StyledLinkContainer>
            <Link href={"/newSheet"}>
              <ButtonContainer>
                <MaterialCommunityIcons
                  name="note-plus"
                  size={160}
                  color="#fff"
                />
                <StyledSheetText>Create a New Sheet</StyledSheetText>
              </ButtonContainer>
            </Link>
          </StyledLinkContainer>
        ) : (
          <View style={{ width: "100%", alignItems: "center" }}>
            <View
              style={{
                width: "100%",
                alignItems: "flex-end",
                marginRight: 50,
                marginTop: 20,
              }}
            >
              <AddButton />
            </View>
            <SheetList />
          </View>
        )}
      </SheetsContainer>
    </Container>
  );
}
