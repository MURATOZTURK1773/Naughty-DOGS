import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { SectionLayout } from "../Layouts/SectionalLayout";

interface ClassSectionProps {
  activeTab: string;
  children: React.ReactNode;
  dogs: Dog[];
  updateDog: (dog: Dog) => void;
  deleteDog: (id: number) => void;
  onHeartClick: (id: number, isFavorite: boolean) => void;
  onEmptyHeartClick: (id: number, isFavorite: boolean) => void;
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
  isLoading: boolean;
  favoritedCount: number;
  unfavoritedCount: number;
}

interface ClassSectionState {
  activeTab: string;
  allDogs: Dog[];
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
  isLoading: boolean;
}

export class ClassSection extends Component<
  ClassSectionProps,
  ClassSectionState
> {
  constructor(props: ClassSectionProps) {
    super(props);
    this.state = {
      activeTab: props.activeTab || "",
      allDogs: props.dogs,
      favoritedDogs: props.dogs.filter((dog) => dog.isFavorite),
      unfavoritedDogs: props.dogs.filter((dog) => !dog.isFavorite),
      isLoading: false,
    };
  }

  componentDidUpdate(prevProps: ClassSectionProps) {
    if (prevProps.dogs !== this.props.dogs) {
      this.updateDogsLists(this.props.dogs);
    }
  }

  updateDogsLists(dogs: Dog[]) {
    const favoritedDogs = dogs.filter((dog) => dog.isFavorite);
    const unfavoritedDogs = dogs.filter((dog) => !dog.isFavorite);

    this.setState({
      allDogs: dogs,
      favoritedDogs: favoritedDogs,
      unfavoritedDogs: unfavoritedDogs,
    });
  }

  handleHeartClick = (id: number, isFavorite: boolean) => {
    this.props.onHeartClick(id, isFavorite);
  };

  handleEmptyHeartClick = (id: number, isFavorite: boolean) => {
    this.props.onEmptyHeartClick(id, isFavorite);
  };

  handleTabClick = (tab: string) => {
    this.setState({
      activeTab: tab === this.state.activeTab ? "" : tab,
    });
  };

  render() {
    const tabComponents: { [key: string]: JSX.Element } = {
      favorited: (
        <ClassDogs
          updateDog={this.props.updateDog}
          deleteDog={this.props.deleteDog}
          onHeartClick={this.handleHeartClick}
          onEmptyHeartClick={this.handleEmptyHeartClick}
          dogs={this.state.favoritedDogs}
          isLoading={this.state.isLoading}
          children
        />
      ),
      unfavorited: (
        <ClassDogs
          updateDog={this.props.updateDog}
          deleteDog={this.props.deleteDog}
          onHeartClick={this.handleHeartClick}
          onEmptyHeartClick={this.handleEmptyHeartClick}
          dogs={this.state.unfavoritedDogs}
          isLoading={this.state.isLoading}
          children
        />
      ),
      "create dog": <ClassCreateDogForm createDog={this.props.createDog} />,
    };

    return (
      <section id="main-section-primary">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>
          <div className="selectors">
            {["favorited", "unfavorited", "create dog"].map((tab) => (
              <div
                key={tab}
                className={`selector ${
                  this.state.activeTab === tab ? "active" : ""
                }`}
                onClick={() => this.handleTabClick(tab)}
              >
                {tab === "favorited"
                  ? "favorited"
                  : tab === "unfavorited"
                  ? "unfavorited"
                  : "create dog"}{" "}
                {tab === "favorited"
                  ? this.state.favoritedDogs.length
                  : tab === "unfavorited"
                  ? this.state.unfavoritedDogs.length
                  : ""}
              </div>
            ))}
          </div>
        </div>
        <div className="content-container">
          <div>
            {this.state.activeTab !== "favorited" &&
              this.state.activeTab !== "unfavorited" &&
              this.state.activeTab !== "create dog" && (
                <SectionLayout>
                  <ClassDogs
                    updateDog={this.props.updateDog}
                    deleteDog={this.props.deleteDog}
                    onHeartClick={this.handleHeartClick}
                    onEmptyHeartClick={this.handleEmptyHeartClick}
                    dogs={this.state.allDogs}
                    isLoading={this.state.isLoading}
                    children
                  />
                </SectionLayout>
              )}

            {this.state.activeTab && (
              <SectionLayout>
                {tabComponents[this.state.activeTab]}
              </SectionLayout>
            )}
          </div>
        </div>
      </section>
    );
  }
}
