export type Dog = {
  id: number;
  image: string;
  description: string;
  isFavorite: boolean;
  name: string;
};

export type ActiveTab =
  | "none-selected"
  | "favorited"
  | "unfavorited"
  | "create dog";
