import uuid from "uuid/v4";
import { Evidence, Column, Tag, Member } from "data/classes.js";

// Members
export const members = {
  MATT: new Member("Matt", "Franklin"),
  MARGOT: new Member("Margot", "Henderson"),
  MICHAEL: new Member("Michael", "Silvestre"),
  HALEY: new Member("Haley", "Park"),
  CAITLIN: new Member("Caitlin", "Coyiuto"),
};

// Tags
export const tags = {
  YAKITORI: new Tag("Yakitori", "#FAA2C1"),
  SUSHI: new Tag("Sushi", "#9C36B5"),
  TEMPURA: new Tag("Tempura", "#FA5252"),
  RAMEN: new Tag("Ramen", "#748FFC"),
  SOBA: new Tag("Soba", "#845EF7"),
};

export const users = [];

// Evidence
const items = [
  new Evidence(
    "Salmon1",
    [tags.YAKITORI, tags.SOBA],
    members.MATT,
    null,
    false
  ),
  new Evidence(
    "Salmon2",
    [tags.YAKITORI, tags.SUSHI],
    members.MARGOT,
    null,
    false
  ),
  new Evidence("Salmon3", [tags.TEMPURA], members.CAITLIN, null, false),
  new Evidence(
    "Salmon4",
    [tags.TEMPURA, tags.SUSHI],
    members.HALEY,
    null,
    false
  ),
  new Evidence(
    "Salmon5",
    [tags.TEMPURA, tags.RAMEN],
    members.MICHAEL,
    null,
    false
  ),
  new Evidence(
    "Salmon6",
    [tags.YAKITORI, tags.SOBA],
    members.MATT,
    null,
    false
  ),
  new Evidence(
    "Salmon7",
    [tags.YAKITORI, tags.SUSHI],
    members.MARGOT,
    null,
    true
  ),
  new Evidence("Salmon8", [tags.TEMPURA], members.CAITLIN, null, true),
  new Evidence(
    "Salmon9",
    [tags.TEMPURA, tags.SUSHI],
    members.HALEY,
    null,
    true
  ),
  new Evidence(
    "Salmon10",
    [tags.TEMPURA, tags.RAMEN],
    members.MICHAEL,
    null,
    true
  ),
];

// Source list / bucket
export const sourceColumn = {
  [uuid()]: new Column("Source List", items),
};

// Empty destination buckets
export const columnsFromBackend = {
  [uuid()]: new Column("Destination 1", items.slice(6, 10)),
  [uuid()]: new Column("Destination 2"),
  [uuid()]: new Column("Destination 3"),
  [uuid()]: new Column("Destination 4"),
};
