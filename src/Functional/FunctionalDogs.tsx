import React from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

export interface FunctionalDogsProps {
  dogs: Dog[];
  deleteDog: (id: number) => void;
  onHeartClick: (id: number, isFavorite: boolean) => void;
  onEmptyHeartClick: (id: number, isFavorite: boolean) => void;
  isLoading: boolean;
}

export const FunctionalDogs: React.FC<FunctionalDogsProps> = ({
  dogs,
  deleteDog,
  onEmptyHeartClick,
  onHeartClick,
  isLoading,
}) => {
  return (
    <>
      <section id="main-section">
        <div className="content-container">
          {dogs.map((dog) => (
            <DogCard
              key={dog.id}
              dog={dog}
              onTrashIconClick={() => deleteDog(dog.id)}
              onHeartClick={() => onHeartClick(dog.id, !dog.isFavorite)}
              onEmptyHeartClick={() =>
                onEmptyHeartClick(dog.id, !dog.isFavorite)
              }
              isLoading={isLoading}
            />
          ))}
        </div>
      </section>
    </>
  );
};
