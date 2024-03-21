import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ActiveTab, Dog } from "../types";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { SectionLayout } from "../Layouts/SectionalLayout";
import React from "react";

interface FunctionalSectionProps {
  activeTab: ActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
  children?: ReactNode;
  isLoading: boolean;
  favoritedCount: number;
  unfavoritedCount: number;
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
}

export const FunctionalSection: React.FC<FunctionalSectionProps> = (
  props: FunctionalSectionProps
) => {
  const handleTabClick = (tab: ActiveTab) => {
    const validChoices = [
      "none-selected",
      "favorited",
      "unfavorited",
      "create dog",
    ] as ActiveTab[];

    if (validChoices.includes(tab)) {
      props.setActiveTab((currentTab) =>
        currentTab === tab ? "none-selected" : tab
      );
    }
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
              onClick={() => handleTabClick(tab as ActiveTab)}
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
          <SectionLayout>{props.children}</SectionLayout>
          {props.activeTab === "create dog" && (
            <FunctionalCreateDogForm createDog={props.createDog} />
          )}
        </div>
      </div>
    </section>
  );
};
