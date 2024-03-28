import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ActiveTab } from "../types";

interface ClassSectionProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  children: React.ReactNode;
  isLoading: boolean;
  favoritedCount: number;
  unfavoritedCount: number;
}

export class ClassSection extends Component<ClassSectionProps> {
  handleTabClick = (tab: ActiveTab) => {
    this.props.setActiveTab(tab);
  };

  Tab = ({
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

  render() {
    const { activeTab, children, favoritedCount, unfavoritedCount } =
      this.props;

    return (
      <section id="main-section-primary">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>
          <div className="selectors">
            {(["favorited", "unfavorited", "create dog"] as const).map(
              (tab) => (
                <this.Tab
                  tab={tab}
                  isActive={tab === activeTab}
                  handleTabClick={this.handleTabClick}
                  key={tab}
                  favoritedCount={favoritedCount}
                  unfavoritedCount={unfavoritedCount}
                />
              )
            )}
          </div>
        </div>
        <div className="content-container">
          <div>{children}</div>
        </div>
      </section>
    );
  }
}
