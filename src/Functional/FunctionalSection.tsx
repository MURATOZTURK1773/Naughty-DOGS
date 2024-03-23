import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ActiveTab, Dog } from "../types";
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

const Tab = ({
  tab,
  isActive,
  handleTabClick,
  favoritedCount,
  unfavoritedCount,
}: {
  tab: ActiveTab;
  isActive: boolean;
  handleTabClick: (input: ActiveTab) => void;
  favoritedCount: number;
  unfavoritedCount: number;
}) => {
  const text = tab
    .split("")
    .map((c, i) => (i === 0 ? c.toUpperCase() : c.toLowerCase()))
    .join("");

  return (
    <div
      className={`selector ${isActive ? "active" : ""}`}
      onClick={() => handleTabClick(tab as ActiveTab)}
    >
      {text}
      {tab === "favorited" && `(${favoritedCount})`}
      {tab === "unfavorited" && `(${unfavoritedCount})`}
    </div>
  );
};

export const FunctionalSection: React.FC<FunctionalSectionProps> = (
  props: FunctionalSectionProps
) => {
  const handleTabClick = (tab: ActiveTab) => {
    props.setActiveTab((currentTab) =>
      currentTab === tab ? "none-selected" : tab
    );
  };

  return (
    <section id="main-section-primary">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {(["favorited", "unfavorited", "create dog"] as const).map((tab) => (
            <Tab
              isActive={tab === props.activeTab}
              handleTabClick={handleTabClick}
              tab={tab}
              favoritedCount={props.favoritedCount}
              unfavoritedCount={props.unfavoritedCount}
            />
          ))}
        </div>
      </div>

      <div className="content-container">
        <div>{props.children}</div>
      </div>
    </section>
  );
};
