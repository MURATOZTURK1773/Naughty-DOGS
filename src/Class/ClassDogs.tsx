import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

export interface ClassDogsProps {
  dogs: Dog[];
  updateDog: (dog: Dog) => void;
  deleteDog: (id: number) => void;
  onHeartClick: (id: number, isFavorite: boolean) => void;
  onEmptyHeartClick: (id: number, isFavorite: boolean) => void;
  isLoading: boolean;
  children: React.ReactNode;
}

export class ClassDogs extends Component<ClassDogsProps> {
  render() {
    return (
      <>
        <section id="main-section">
          <div className="content-container">
            {this.props.dogs &&
              this.props.dogs.map((dog) => (
                <DogCard
                  key={dog.id}
                  dog={dog}
                  onTrashIconClick={() => this.props.deleteDog(dog.id)}
                  onHeartClick={() =>
                    this.props.onHeartClick(dog.id, !dog.isFavorite)
                  }
                  onEmptyHeartClick={() =>
                    this.props.onEmptyHeartClick(dog.id, !dog.isFavorite)
                  }
                  isLoading={this.props.isLoading}
                />
              ))}
          </div>
        </section>
      </>
    );
  }
}
