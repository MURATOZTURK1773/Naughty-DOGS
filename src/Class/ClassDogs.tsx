import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

export interface ClassDogsProps {
  dogs: Dog[];
  deleteDog: (id: number) => void;
  onHeartClick: (id: number, isFavorite: boolean) => void;
  onEmptyHeartClick: (id: number, isFavorite: boolean) => void;
  isLoading: boolean;
}

export class ClassDogs extends Component<ClassDogsProps> {
  render() {
    const { dogs, deleteDog, onEmptyHeartClick, onHeartClick, isLoading } =
      this.props;

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
  }
}
