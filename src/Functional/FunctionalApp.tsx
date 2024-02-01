import { useEffect, useState } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { Requests } from "../api";
import { FunctionalDogsProps } from "./FunctionalDogs";

export function FunctionalApp(props: FunctionalDogsProps) {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [favoritedDogs, setFavoritedDog] = useState<Dog[]>([]);
  const [unfavoritedDogs, setUnFavoritedDog] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    refetchData()
      .then(() => {
        setFavoritedDog(allDogs.filter((dog) => dog.isFavorite === true));
        setUnFavoritedDog(allDogs.filter((dog) => dog.isFavorite === false));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const refetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => {
        setAllDogs(() => {
          const favoritedDogs = dogs.filter((dog) => dog.isFavorite === true);
          const unfavoritedDogs = dogs.filter(
            (dog) => dog.isFavorite === false
          );
          setFavoritedDog(favoritedDogs);
          setUnFavoritedDog(unfavoritedDogs);
          return dogs;
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching data:", error);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateDog = (dog: Partial<Dog>) => {
    setIsLoading(true);
    return Requests.updateDog({
      id: dog.id,
      isFavorite: dog.isFavorite,
    })
      .then(() => {
        setAllDogs((prevDogs: Dog[]) => {
          return prevDogs.map((prevDog) => {
            if (prevDog.id === dog.id) {
              return { ...prevDog, isFavorite: dog.isFavorite ?? false };
            }
            return prevDog;
          });
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error updating dog:", error);
      });
  };

  const handleHeartClick = async (id: number, isFavorite: boolean) => {
    setIsLoading(true);
    return Requests.updateDog({
      id: id,
      isFavorite: isFavorite,
    })
      .then(() => {
        refetchData();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const createDog = (dog: Omit<Dog, "id">) => {
    return Requests.postDog(dog).then(refetchData);
  };

  const deleteDog = (id: number) => {
    return Requests.deleteDog(id).then(refetchData);
  };

  const favoritedDogsCount = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavoritedDogsCount = allDogs.filter((dog) => !dog.isFavorite).length;

  const renderFunctionalSectionComponent = (dogs: Dog[], tab: string) => {
    return (
      <FunctionalSection
        dogs={dogs}
        updateDog={updateDog}
        deleteDog={deleteDog}
        onEmptyHeartClick={handleHeartClick}
        onHeartClick={handleHeartClick}
        createDog={createDog}
        isLoading={isLoading}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritedCount={favoritedDogsCount}
        unfavoritedCount={unfavoritedDogsCount}
      >
        {props.children}
      </FunctionalSection>
    );
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      {activeTab === "favorited" &&
        renderFunctionalSectionComponent(favoritedDogs, activeTab)}
      {activeTab === "unfavorited" &&
        renderFunctionalSectionComponent(unfavoritedDogs, activeTab)}
      {activeTab !== "favorited" &&
        activeTab !== "unfavorited" &&
        renderFunctionalSectionComponent(allDogs, activeTab)}
    </div>
  );
}
