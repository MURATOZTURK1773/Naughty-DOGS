import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  getAllDogs: (): Promise<Dog[]> =>
    fetch(`${baseUrl}/dogs`).then((response) => response.json()),
  postDog: (dog: Omit<Dog, "id">) => {
    return fetch(`${baseUrl}/dogs`, {
      body: JSON.stringify(dog),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  },

  deleteDog: (id: number) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    }).then((response) => {
      response.json();
    });
  },

  updateDog: (dog: Partial<Dog>): Promise<void | Dog> => {
    const { id } = dog;
    return fetch(`${baseUrl}/dogs/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify({ isFavorite: dog.isFavorite }),
    }).then((response) => response.json());
  },

  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
