import FavoriteCard from "@/components/favoriteCard";
import useStore from "@/store/store";
import { FlatList, View, Text } from "react-native";
import {
  BannerAd,
  TestIds,
  BannerAdSize,
} from "react-native-google-mobile-ads";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { IsSheet } from "@/types/types";
import { Colors } from "@/constants/Colors";

const Container = styled.SafeAreaView`
  heigt: 100%;
  background-color: ${Colors.light.background};
`;

const FlatlistContainer = styled.View`
  padding: 20px;
  height: 100%;
  background-color: ${Colors.light.background};
`;

export default function TabTwoScreen() {
  const { favorites, removeSheet } = useStore();

  const handleRemoveFavorite = (id: string) => {
    removeSheet(id);
  };
  const renderItem = ({ item }: { item: IsSheet }) => (
    <FavoriteCard item={item} onRemove={handleRemoveFavorite} />
  );
  return (
    <Container>
      {/* <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        /> */}
      <FlatlistContainer>
        {favorites.length !== 0 ? (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text>No favorites yet</Text>
          </View>
        )}
      </FlatlistContainer>
    </Container>
  );
}
