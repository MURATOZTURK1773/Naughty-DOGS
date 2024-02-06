import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogsProps } from "./ClassDogs";
import { Dog } from "../types";
import { Requests } from "../api";

interface ClassComponentProps extends ClassDogsProps {}

export interface ClassComponentState {
  allDogs: Dog[];
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
  activeTab: string;
  isLoading: boolean;
}

export class ClassApp extends Component<
  ClassComponentProps,
  ClassComponentState
> {
  state = {
    allDogs: [],
    favoritedDogs: [],
    unfavoritedDogs: [],
    activeTab: "",
    isLoading: false,
  };

  componentDidMount(): void {
    this.setState({ isLoading: true });
    this.refetchData().then(() => {
      const allDogs = this.state.allDogs as Dog[];

      const favoritedDogs = allDogs.filter((dog) => dog.isFavorite === true);
      const unfavoritedDogs = allDogs.filter((dog) => dog.isFavorite === false);
      this.setState({
        favoritedDogs: favoritedDogs,
        unfavoritedDogs: unfavoritedDogs,
      });
    });
  }

  refetchData = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()

      .then((dogs) => {
        const favoritedDogs = dogs.filter((dog) => dog.isFavorite === true);
        const unfavoritedDogs = dogs.filter((dog) => dog.isFavorite === false);

        this.setState({
          allDogs: dogs,
          favoritedDogs: favoritedDogs,
          unfavoritedDogs: unfavoritedDogs,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  updateDog = (dog: Partial<Dog>) => {
    this.setState({ isLoading: true });
    return Requests.updateDog({
      id: dog.id,
      isFavorite: dog.isFavorite,
    })
      .then(() => {
        this.setState((prevDogs) => {
          return {
            ...prevDogs,
            allDogs: prevDogs.allDogs.map((prevDog) => {
              if (prevDog.id === dog.id) {
                return { ...prevDog, isFavorite: dog.isFavorite ?? false };
              }
              return prevDog;
            }),
          };
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.error("Error updating dog:", error);
      });
  };

  handleHeartClick = (id: number, isFavorite: boolean) => {
    this.setState({ isLoading: true });
    return Requests.updateDog({
      id: id,
      isFavorite: isFavorite,
    })
      .then(() => {
        this.refetchData();
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  createDog = (dog: Omit<Dog, "id">) => {
    return Requests.postDog(dog).then(this.refetchData);
  };

  deleteDog = (id: number) => {
    return Requests.deleteDog(id).then(this.refetchData);
  };

  render() {
    const { allDogs, activeTab } = this.state;

    const dogsArray = allDogs as Dog[];

    const favoritedDogsCount = dogsArray.filter((dog) => dog.isFavorite).length;
    const unfavoritedDogsCount = dogsArray.filter(
      (dog) => !dog.isFavorite
    ).length;

    const renderClassSectionComponent = (dogs: Dog[], tab: string) => {
      return (
        <ClassSection
          activeTab={this.state.activeTab}
          updateDog={this.updateDog}
          dogs={dogs}
          favoritedCount={favoritedDogsCount}
          unfavoritedCount={unfavoritedDogsCount}
          isLoading={this.state.isLoading}
          deleteDog={this.deleteDog}
          onEmptyHeartClick={this.handleHeartClick}
          onHeartClick={this.handleHeartClick}
          createDog={this.createDog}
        >
          {this.props.children}
        </ClassSection>
      );
    };

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>

        {activeTab === "favorited" &&
          renderClassSectionComponent(this.state.favoritedDogs, activeTab)}
        {activeTab === "unfavorited" &&
          renderClassSectionComponent(this.state.unfavoritedDogs, activeTab)}
        {activeTab !== "favorited" &&
          activeTab !== "unfavorited" &&
          renderClassSectionComponent(allDogs, activeTab)}
      </div>
    );
  }
}
