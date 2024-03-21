import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { SectionLayout } from "../Layouts/SectionalLayout";
import { ActiveTab } from "../types";

interface ClassSectionProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  children?: React.ReactNode;
  isLoading: boolean;
  favoritedCount: number;
  unfavoritedCount: number;
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
}

export class ClassSection extends Component<ClassSectionProps> {
  handleTabClick = (tab: ActiveTab) => {
    const validChoices = [
      "favorited",
      "unfavorited",
      "create dog",
    ] as ActiveTab[];
    if (validChoices.includes(tab)) {
      this.props.setActiveTab(tab);
    }
  };

  render() {
    const { activeTab, children, favoritedCount, unfavoritedCount, createDog } =
      this.props;

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
                className={`selector ${activeTab === tab ? "active" : ""}`}
                onClick={() => this.handleTabClick(tab as ActiveTab)}
              >
                {tab === "favorited"
                  ? "favorited"
                  : tab === "unfavorited"
                  ? "unfavorited"
                  : "create dog"}{" "}
                {tab === "favorited"
                  ? favoritedCount
                  : tab === "unfavorited"
                  ? unfavoritedCount
                  : ""}
              </div>
            ))}
          </div>
        </div>
        <div className="content-container">
          <div>
            <SectionLayout>{children}</SectionLayout>
            {activeTab === "create dog" && (
              <ClassCreateDogForm createDog={createDog} />
            )}
          </div>
        </div>
      </section>
    );
  }
}
