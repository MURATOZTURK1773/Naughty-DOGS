import React, { ReactNode } from "react";
import { DogCard } from "../Shared/DogCard";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

export interface FunctionalDogsProps {
  dogs: Dog[];
  updateDog: (dog: Dog) => void;
  deleteDog: (id: number) => void;
  onHeartClick: (id: number, isFavorite: boolean) => void;
  onEmptyHeartClick: (id: number, isFavorite: boolean) => void;
  isLoading: boolean;
  children: ReactNode;
}

export const FunctionalDogs: React.FC<FunctionalDogsProps> = (
  props: FunctionalDogsProps
) => {
  return (
    <>
      <section id="main-section">
        <div className="content-container">
          {props.dogs &&
            props.dogs.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                onTrashIconClick={() => props.deleteDog(dog.id)}
                onHeartClick={() => props.onHeartClick(dog.id, !dog.isFavorite)}
                onEmptyHeartClick={() =>
                  props.onEmptyHeartClick(dog.id, !dog.isFavorite)
                }
                isLoading={props.isLoading}
              />
            ))}
        </div>
      </section>
    </>
  );
};
