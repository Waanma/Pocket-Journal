export type IsSheet = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export interface SheetState {
  loadFavorites: any;
  favorites: IsSheet[];
  loadSheets: any;
  sheets: IsSheet[];
  addSheet: (title: string, content: string, createdAt: string) => void;
  updateSheet: (id: string, title: string, content: string) => void;
  removeSheet: (id: string) => void;
  addFavorite: (
    id: string,
    title: string,
    content: string,
    createdAt: string
  ) => void;
}

export interface FavoriteItemProps {
  item: IsSheet;
  onRemove: (id: string) => void;
}
