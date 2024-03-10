import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FunctionalDogs } from "./FunctionalDogs";
import { ActiveTab, Dog } from "../types";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { SectionLayout } from "../Layouts/SectionalLayout";

interface FunctionalSectionProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
  children: ReactNode;
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

export const FunctionalSection: React.FC<FunctionalSectionProps> = (
  props: FunctionalSectionProps
) => {
  const handleHeartClick = (id: number, isFavorite: boolean) => {
    props.onHeartClick(id, isFavorite);
  };

  const handleEmptyHeartClick = (id: number, isFavorite: boolean) => {
    props.onEmptyHeartClick(id, isFavorite);
  };

  const handleTabClick = (tab: string) => {
    if (["", "favorited", "unfavorited", "create dog"].includes(tab)) {
      props.setActiveTab((prevTab) =>
        prevTab === (tab as ActiveTab) ? "" : (tab as ActiveTab)
      );
      switch (tab) {
        case "favorited":
          break;
        case "unfavorited":
          break;
        case "create dog":
          break;
        default:
          break;
      }
    }
  };

  const tabComponents: { [key: string]: JSX.Element } = {
    favorited: (
      <FunctionalDogs
        updateDog={props.updateDog}
        deleteDog={props.deleteDog}
        onHeartClick={handleHeartClick}
        onEmptyHeartClick={handleEmptyHeartClick}
        dogs={props.dogs}
        isLoading={props.isLoading}
        children
      />
    ),
    unfavorited: (
      <FunctionalDogs
        updateDog={props.updateDog}
        deleteDog={props.deleteDog}
        onHeartClick={handleHeartClick}
        onEmptyHeartClick={handleEmptyHeartClick}
        dogs={props.dogs}
        isLoading={props.isLoading}
        children
      />
    ),
    "create dog": <FunctionalCreateDogForm createDog={props.createDog} />,
  };

  return (
    <section id="main-section-primary">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {["favorited", "unfavorited", "create dog"].map((tab) => (
            <div
              key={tab}
              className={`selector ${props.activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab === "favorited"
                ? "favorited"
                : tab === "unfavorited"
                ? "unfavorited"
                : "create dog"}{" "}
              {tab === "favorited"
                ? props.favoritedCount
                : tab === "unfavorited"
                ? props.unfavoritedCount
                : ""}
            </div>
          ))}
        </div>
      </div>
      <div className="content-container">
        <div>
          {props.activeTab !== "favorited" &&
            props.activeTab !== "unfavorited" &&
            props.activeTab !== "create dog" && (
              <SectionLayout>
                <FunctionalDogs
                  updateDog={props.updateDog}
                  deleteDog={props.deleteDog}
                  onHeartClick={handleHeartClick}
                  onEmptyHeartClick={handleEmptyHeartClick}
                  dogs={props.dogs}
                  isLoading={props.isLoading}
                  children
                />
              </SectionLayout>
            )}

          {props.activeTab && (
            <SectionLayout>{tabComponents[props.activeTab]}</SectionLayout>
          )}
        </div>
      </div>
    </section>
  );
};
