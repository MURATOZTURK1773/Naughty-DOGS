export type Dog = {
  id: number;
  image: string;
  description: string;
  isFavorite: boolean;
  name: string;
};

export type ActiveTab = "" | "favorited" | "unfavorited" | "create dog";
