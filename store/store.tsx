import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { IsSheet, SheetState } from "@/types/types";

const loadSheetsFromStorage = async () => {
  try {
    const sheets = await AsyncStorage.getItem("sheets");
    return sheets ? JSON.parse(sheets) : [];
  } catch (error) {
    console.error("Error loading sheets from storage:", error);
    return [];
  }
};

const saveSheetsToStorage = async (sheets: any) => {
  try {
    await AsyncStorage.setItem("sheets", JSON.stringify(sheets));
  } catch (error) {
    console.error("Error saving sheets to storage:", error);
  }
};
const loadFavoritesFromStorage = async () => {
  try {
    const favorites = await AsyncStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error loading favorites from storage:", error);
    return [];
  }
};
const saveFavoritesToStorage = async (favorites: any) => {
  try {
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites to storage:", error);
  }
};

const useStore = create<SheetState>((set) => ({
  sheets: [],
  favorites: [],

  loadSheets: async () => {
    const storedSheets = await loadSheetsFromStorage();
    set({ sheets: storedSheets });
  },

  addSheet: (title: string, content: string, createdAt: string) => {
    try {
      let id =
        Date.now().toString(36) + Math.random().toString(36).substring(2);
      set((state) => {
        const newSheets = [{ id, title, content, createdAt }, ...state.sheets];
        saveSheetsToStorage(newSheets);
        return { sheets: newSheets };
      });
    } catch (error) {
      console.error("Error generating UUID:", error);
    }
  },

  updateSheet: (id, title, content) =>
    set((state) => {
      const updatedSheets = state.sheets.map((sheet) =>
        sheet.id === id ? { ...sheet, title, content } : sheet
      );
      const updatedFavorites = state.favorites.map((fav) =>
        fav.id === id ? { ...fav, title, content } : fav
      );
      saveSheetsToStorage(updatedSheets);
      saveFavoritesToStorage(updatedFavorites);
      return { sheets: updatedSheets, favorites: updatedFavorites };
    }),

  removeSheet: (id) =>
    set((state) => {
      const filteredSheets = state.sheets.filter((sheet) => sheet.id !== id);
      const updatedFavorites = state.favorites.filter((fav) => fav.id !== id);
      saveFavoritesToStorage(updatedFavorites);
      saveSheetsToStorage(filteredSheets);
      return { sheets: filteredSheets, favorites: updatedFavorites };
    }),

  loadFavorites: async () => {
    const storedFavorites = await loadFavoritesFromStorage();
    set({ favorites: storedFavorites });
  },
  addFavorite: (id, title, content, createdAt) =>
    set((state) => {
      const alreadyFavorite = state.favorites.some((fav) => fav.id === id);
      if (alreadyFavorite) {
        return state;
      }

      const newFavorite: IsSheet = {
        id,
        title,
        content,
        createdAt,
      };
      const newFavorites = [newFavorite, ...state.favorites];

      saveFavoritesToStorage(newFavorites);
      return { favorites: newFavorites };
    }),
  updateFavorite: (id: string, title: string, content: string) =>
    set((state) => {
      const updatedFavorites = state.favorites.map((fav) =>
        fav.id === id ? { ...fav, title, content } : fav
      );
      saveFavoritesToStorage(updatedFavorites);
      return { favorites: updatedFavorites };
    }),
}));

export default useStore;
