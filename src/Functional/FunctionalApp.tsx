import { useEffect, useState } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";
import { FunctionalDogs } from "./FunctionalDogs";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    refetchData().finally(() => {
      setIsLoading(false);
    });
  }, []);

  const refetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => {
        setAllDogs(dogs);
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

  const handleHeartClick = (id: number, isFavorite: boolean) => {
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

  let filteredDogs = allDogs.filter((dog) => {
    if (activeTab === "create dog") return false;
    if (activeTab === "favorited") return dog.isFavorite;
    if (activeTab === "unfavorited") return !dog.isFavorite;
    if (activeTab === "") return true;
  });

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeTab={activeTab}
        isLoading={isLoading}
        favoritedCount={favoritedDogsCount}
        unfavoritedCount={unfavoritedDogsCount}
        setActiveTab={setActiveTab}
        dogs={filteredDogs}
        createDog={createDog}
        updateDog={updateDog}
        deleteDog={deleteDog}
        onEmptyHeartClick={handleHeartClick}
        onHeartClick={handleHeartClick}
      >
        <FunctionalDogs
          dogs={filteredDogs}
          updateDog={updateDog}
          deleteDog={deleteDog}
          onEmptyHeartClick={handleHeartClick}
          onHeartClick={handleHeartClick}
          isLoading={isLoading}
          children
        />
      </FunctionalSection>
    </div>
  );
}
