import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { Dog } from "../types";
import { Requests } from "../api";
import { ClassDogs } from "./ClassDogs";

export interface ClassComponentState {
  allDogs: Dog[];
  activeTab: string;
  isLoading: boolean;
}

export class ClassApp extends Component<
  Record<string, never>,
  ClassComponentState
> {
  state: ClassComponentState = {
    allDogs: [],
    activeTab: "",
    isLoading: false,
  };

  componentDidMount(): void {
    this.setState({ isLoading: true });
    this.refetchData().finally(() => {
      this.setState({ isLoading: false });
    });
  }

  refetchData = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()

      .then((dogs) => {
        this.setState({
          allDogs: dogs,
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

    let filteredDogs = allDogs.filter((dog) => {
      if (activeTab === "create dog") return false;
      if (activeTab === "favorited") return dog.isFavorite;
      if (activeTab === "unfavorited") return !dog.isFavorite;
      if (activeTab === "") return true;
    });

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          activeTab={activeTab}
          dogs={filteredDogs}
          isLoading={this.state.isLoading}
          favoritedCount={favoritedDogsCount}
          unfavoritedCount={unfavoritedDogsCount}
          updateDog={this.updateDog}
          deleteDog={this.deleteDog}
          createDog={this.createDog}
          onEmptyHeartClick={this.handleHeartClick}
          onHeartClick={this.handleHeartClick}
        >
          <ClassDogs
            dogs={filteredDogs}
            updateDog={this.updateDog}
            deleteDog={this.deleteDog}
            onEmptyHeartClick={this.handleHeartClick}
            onHeartClick={this.handleHeartClick}
            isLoading={this.state.isLoading}
            children
          />
        </ClassSection>
      </div>
    );
  }
}
