import { Component } from "react";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";
import { ClassDogs } from "./ClassDogs";
import { ClassSection } from "./ClassSection";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

export interface ClassComponentState {
  allDogs: Dog[];
  activeTab: ActiveTab;
  isLoading: boolean;
  setActiveTab: (tab: ActiveTab) => void;
}

export class ClassApp extends Component<
  Record<string, never>,
  ClassComponentState
> {
  setActiveTab = (tab: ActiveTab) => {
    this.setState({ activeTab: tab });
  };

  state: ClassComponentState = {
    allDogs: [],
    activeTab: "none-selected",
    isLoading: false,
    setActiveTab: this.setActiveTab,
  };

  componentDidMount(): void {
    this.refetchData();
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
      if (activeTab === "none-selected") return true;
    });

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          activeTab={activeTab}
          setActiveTab={this.state.setActiveTab}
          isLoading={this.state.isLoading}
          favoritedCount={favoritedDogsCount}
          unfavoritedCount={unfavoritedDogsCount}
        >
          {activeTab !== "create dog" && (
            <ClassDogs
              dogs={filteredDogs}
              deleteDog={this.deleteDog}
              onEmptyHeartClick={this.handleHeartClick}
              onHeartClick={this.handleHeartClick}
              isLoading={this.state.isLoading}
            />
          )}
          {activeTab === "create dog" && (
            <ClassCreateDogForm createDog={this.createDog} />
          )}
        </ClassSection>
      </div>
    );
  }
}
