import uuid from "uuid/v4";
import moment from "moment";
import {
  Evidence,
  Column,
  Tag,
  Member,
  Participant,
  Comment,
} from "data/classes.js";

// Members
export const members = {
  MATT: new Member("Matt", "Franklin"),
  MARGOT: new Member("Margot", "Henderson"),
  MICHAEL: new Member("Michael", "Silvestre"),
  HALEY: new Member("Haley", "Park"),
  CAITLIN: new Member("Caitlin", "Coyiuto"),
};

// Participants
export const participants = {
  P1: new Participant(
    "P1",
    "Staff Engineer",
    "500",
    "Been at company for 2 years."
  ),
  P2: new Participant(
    "P2",
    "Project Manager",
    "1000",
    "Recently moved to this company."
  ),
  P3: new Participant(
    "P3",
    "Senior Designer",
    "750",
    "Have been working in company for 10 years."
  ),
};

// Tags
export const tags = {
  YAKITORI: new Tag("Yakitori", "#FAA2C1"),
  SUSHI: new Tag("Sushi", "#9C36B5"),
  TEMPURA: new Tag("Tempura", "#FA5252"),
  RAMEN: new Tag("Ramen", "#748FFC"),
  SOBA: new Tag("Soba", "#845EF7"),
};

// Comment threads
const commentThreads = {
  ONE: [
    new Comment(members.MATT, "How much lorem can we ipsum?", moment().day(-1)),
    new Comment(
      members.MARGOT,
      "How much ipsum can we lorem?",
      moment().day(0)
    ),
    new Comment(
      members.MICHAEL,
      "Why does lorem need an ipsum?",
      moment().day(0)
    ),
  ],
};

// Evidence
const items = [
  new Evidence(
    "Quote1 here",
    [tags.YAKITORI, tags.SOBA],
    members.MATT,
    participants.P1,
    { start: "I am the beginning", end: "I am the end." },
    commentThreads.ONE
  ),
  new Evidence(
    "Quote2 here",
    [tags.YAKITORI, tags.SUSHI],
    members.MARGOT,
    participants.P2,
    { start: "I am the beginning", end: "I am the end." },
    commentThreads.ONE
  ),
  new Evidence(
    "Quote3 here",
    [tags.TEMPURA],
    members.CAITLIN,
    participants.P3,
    { start: "I am the beginning", end: "I am the end." },
    commentThreads.ONE
  ),
  new Evidence(
    "Quote4 here",
    [tags.TEMPURA, tags.SUSHI],
    members.HALEY,
    participants.P1,
    { start: "I am the beginning", end: "I am the end." },
    commentThreads.ONE
  ),
  new Evidence(
    "Quote5 here",
    [tags.TEMPURA, tags.RAMEN],
    members.MICHAEL,
    participants.P2,
    { start: "I am the beginning", end: "I am the end." },
    commentThreads.ONE
  ),
  new Evidence(
    "Quote6 here",
    [tags.YAKITORI, tags.SOBA],
    members.MATT,
    participants.P3,
    { start: "I am the beginning", end: "I am the end." },
    commentThreads.ONE
  ),
  new Evidence(
    "Quote7 here",
    [tags.YAKITORI, tags.SUSHI],
    members.MARGOT,
    participants.P1,
    { start: "I am the beginning", end: "I am the end." },
    commentThreads.ONE
  ),
  new Evidence(
    "Quote8 here",
    [tags.TEMPURA],
    members.CAITLIN,
    participants.P2,
    { start: "I am the beginning", end: "I am the end." },
    commentThreads.ONE
  ),
  new Evidence(
    "Quote9 here",
    [tags.TEMPURA, tags.SUSHI],
    members.HALEY,
    participants.P3,
    { start: "I am the beginning", end: "I am the end." },
    commentThreads.ONE
  ),
  new Evidence(
    "Quote10 here",
    [tags.TEMPURA, tags.RAMEN],
    members.MICHAEL,
    participants.P1,
    { start: "I am the beginning", end: "I am the end." }
  ),
];

// Source list / bucket
export const sourceColumn = {
  [uuid()]: new Column("Source List", items),
};

// Empty destination buckets
export const columnsFromBackend = {};
// export const columnsFromBackend = {
//   [uuid()]: new Column("Destination 1"),
//   [uuid()]: new Column("Destination 2"),
//   [uuid()]: new Column("Destination 3"),
//   [uuid()]: new Column("Destination 4"),
// };
