import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTree,
  faChampagneGlasses,
  // ... other icons ...
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../pages/map.js";
import Button from "./Button";

export default function MapFilter() {
  const filterSet = useContext(Context);
  const [hasBeenSelected, setSelected] = useState(new Array(12).fill(false));
  const [selectAll, setSelectAll] = useState(new Array(3).fill(false));

  const filters = [
    {
      category: "Businesses",
      individual: [
        {
          icon: faChampagneGlasses,
          type: "EntertainmentBusiness",
          name: "Entertainment",
          color: "#015BC4",
          filterID: 0,
        },
        // ... other filters ...
      ],
    },
    // ... other categories ...
  ];

  function handleIndividualClick(element) {
    const newSelected = [...hasBeenSelected];
    const newSelectAll = [...selectAll];
    const newFilterSet = new Set(filterSet.filterSelected);

    newSelected[element.filterID] = !newSelected[element.filterID];
    if (newSelected[element.filterID]) {
      newFilterSet.add(element.type);
    } else {
      newFilterSet.delete(element.type);
    }

    const categoryIndex = Math.floor(element.filterID / 4);
    const categorySelected = newSelected.slice(
      categoryIndex * 4,
      categoryIndex * 4 + 4
    );
    newSelectAll[categoryIndex] = categorySelected.every((selected) => selected);

    setSelected(newSelected);
    filterSet.setFilterSelected(newFilterSet);
    setSelectAll(newSelectAll);
  }

  function handleSelectAllClick(filterCategory, index) {
    const newFilteredSet = new Set(filterSet.filterSelected);
    const newSelected = [...hasBeenSelected];
    const newSelectAll = [...selectAll];

    if (!newSelectAll[index]) {
      filterCategory.individual.forEach((element) => {
        newFilteredSet.add(element.type);
        newSelected[element.filterID] = true;
      });
    } else {
      filterCategory.individual.forEach((element) => {
        newFilteredSet.delete(element.type);
        newSelected[element.filterID] = false;
      });
    }

    newSelectAll[index] = !newSelectAll[index];
    setSelectAll(newSelectAll);
    filterSet.setFilterSelected(newFilteredSet);
    setSelected(newSelected);
  }

  return (
    <div className="filter-container">
      {filters.map((filter, index) => (
        <div className="category-container" key={index}>
          <div className="title-container">
            <h2>{filter.category}</h2>
            <div className="button-container">
              <Button onClick={() => handleSelectAllClick(filter, index)}>
                {selectAll[index] ? "Clear All" : "Select All"}
              </Button>
            </div>
          </div>
          {filter.individual.map((element) => (
            <div
              className="individual-container"
              id={
                hasBeenSelected[element.filterID]
                  ? "clicked-individual"
                  : "not-clicked-individual"
              }
              onClick={() => handleIndividualClick(element)}
              key={element.filterID}
            >
              <FontAwesomeIcon
                icon={element.icon}
                size="sm"
                style={{
                  marginRight: "0.5em",
                  color: element.color,
                }}
              />
              <h3>{element.name}</h3>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
