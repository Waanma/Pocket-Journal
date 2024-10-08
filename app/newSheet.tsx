import { Colors } from "@/constants/Colors";
import { Button } from "react-native";
import {
  BannerAd,
  TestIds,
  BannerAdSize,
} from "react-native-google-mobile-ads";
import styled from "styled-components/native";
import useStore from "@/store/store";
import { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";

const Container = styled.View`
  height: 100%;
  width: 100%;
  flex-direction: row;
`;
const SheetContent = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  padding-horizontal: 20px;
  background-color: ${Colors.light.background};
  border-radius: 10px;
`;
const TextInputContainer = styled.View`
  width: 95%;
  margin-top: 20px;
  border-radius: 5px;
  max-height: 90%;
  padding: 10px;
  background-color: #f5f5f5;
`;
const StyledTitle = styled.TextInput`
  font-size: 18px;
  padding-top: 20px;
  font-family: montserrat;
  font-weight: bold;
`;
const StyledTextInput = styled.TextInput`
  font-size: 16px;
  font-family: montserrat;
`;

const NewSheet = () => {
  const {
    id,
    title: initialTitle,
    content: initialContent,
  } = useLocalSearchParams();

  const idAsString = Array.isArray(id) ? id[0] : id;
  const initialTitleAsString = Array.isArray(initialTitle)
    ? initialTitle[0]
    : initialTitle;
  const initialContentAsString = Array.isArray(initialContent)
    ? initialContent[0]
    : initialContent;

  const [title, setTitle] = useState(initialTitleAsString || "");
  const [content, setContent] = useState(initialContentAsString || "");

  const addSheet = useStore((state) => state.addSheet);
  const updateSheet = useStore((state) => state.updateSheet);

  useEffect(() => {
    if (initialTitleAsString) setTitle(initialTitleAsString);
    if (initialContentAsString) setContent(initialContentAsString);
  }, [initialTitleAsString, initialContentAsString]);

  const handleSave = () => {
    if (title && content) {
      const currentDate = new Date().toLocaleDateString();
      if (idAsString) {
        updateSheet(idAsString, title, content);
      } else {
        addSheet(title, content, currentDate);
      }
      setTitle("");
      setContent("");
      router.back();
    } else {
      alert("Please, fill all the fields");
    }
  };

  return (
    <Container>
      <SheetContent>
        {/* <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        /> */}
        <StyledTitle
          placeholder="Enter a title"
          maxLength={18}
          value={title}
          onChangeText={setTitle}
        />
        <TextInputContainer>
          <StyledTextInput
            placeholder="Start writing"
            multiline
            editable
            value={content}
            onChangeText={setContent}
          />
        </TextInputContainer>

        <Button title="Save" onPress={handleSave} />
      </SheetContent>
    </Container>
  );
};

export default NewSheet;
