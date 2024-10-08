import React from "react";
import { FlatList } from "react-native";
import useStore from "@/store/store";
import CardSheet from "./sheetCard";

const SheetList = () => {
  const { sheets } = useStore();

  return (
    <FlatList
      data={sheets}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CardSheet sheet={item} />}
    />
  );
};

export default SheetList;
