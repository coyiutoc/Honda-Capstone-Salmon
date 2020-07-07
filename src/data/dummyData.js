import uuid from "uuid/v4";

// Evidence
const itemsFromBackend = [
  { id: uuid(), content: "First Salmon" },
  { id: uuid(), content: "Second Salmon" },
  { id: uuid(), content: "Third Salmon" },
  { id: uuid(), content: "Fourth Salmon" },
  { id: uuid(), content: "Fifth Salmon" },
  { id: uuid(), content: "Sixth Salmon" },
  { id: uuid(), content: "Seventh Salmon" },
];

// Source list / bucket
export const sourceColumn =  {[uuid()]: {
  name: "SOURCE LIST",
  items: itemsFromBackend
}};

// Premade empty clusters
export const columnsFromBackend = {
  [uuid()]: {
    name: "One",
    items: []
  },
  [uuid()]: {
    name: "Two",
    items: []
  },
  [uuid()]: {
    name: "Three",
    items: []
  },
  [uuid()]: {
    name: "Four",
    items: []
  }
};
