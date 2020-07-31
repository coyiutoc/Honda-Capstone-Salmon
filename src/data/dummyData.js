import uuid from "uuid/v4";
import {
  Column,
  Tag,
  Member,
  Participant,
  Comment,
  AGE_RANGES,
} from "data/classes.js";
import { parseEvidence, duplicateEvidence } from "data/helpers.js"
import { data } from "data/evidenceTestData.js";
import moment from "moment";

// Members
export const members = {
  M1: new Member("Erica", "Flores"),
  M2: new Member("Allison", "Bishop"),
  M3: new Member("Kevin", "Lu"),
};

// Participants
export const participants = {
  P1: new Participant(
    "P1",
    "Cashier",
    "50",
    "Pittsburgh, PA area",
    AGE_RANGES["20_30"],
    "Female",
  ),
  P2: new Participant(
    "P2",
    "Office Administrator",
    "500",
    "Cleveline OH area -- used to work for GM",
    AGE_RANGES["40_50"],
    "Male",
  ),
  P3: new Participant(
    "P3",
    "Graphic Designer",
    "12",
    "Graphic designer with 6+ year experience working at an agency",
    AGE_RANGES["30_40"],
    "Female"
  ),
};

// Tags
export const tags = {
  T1: new Tag("trip planning", "#FAA2C1"),
  T2: new Tag("trip food", "#9C36B5"),
  T3: new Tag("directions", "#FA5252"),
  T4: new Tag("entertainment", "#748FFC"),
  T5: new Tag("split driving", "#845EF7"),
  T6: new Tag("pitstops", "#FAA2C1"),
  T7: new Tag("long distance", "#9C36B5"),
  T8: new Tag("car troubles", "#FA5252"),
  T9: new Tag("quarantine", "#748FFC"),
  T10: new Tag("groovin'", "#845EF7"),
  T11: new Tag("driving danger", "#FAA2C1"),
  T12: new Tag("nostalgia", "#9C36B5"),
};

export const items = parseEvidence(data.slice(1, data.length));

// Source list / bucket
export const sourceColumn = {
  [uuid()]: new Column("Source List", items),
};

// TODO: customize later for individual columns
const columnThread = {
  CT1: [new Comment(members.M1, "Pretty well distributed.", moment().day(-1)), new Comment(members.M2, "Let's see when Kevin is done running P4 if they fit here too.", moment().day(-1))],
  CT2: [new Comment(members.M3, "Rethink this cluster? Doesn't have good distribution.", moment().day(-3))],
  CT3: [new Comment(members.M2, "I think there's another quote from P2 that fits better here.", moment().day(-1)), new Comment(members.M1, "Yeah I'll try to find it", moment().day(-1))],
};

// Destination buckets
export const columnsFromBackend = {
  [uuid()]: new Column("Destination 1", [duplicateEvidence(items[4]), duplicateEvidence(items[15]), duplicateEvidence(items[32])], "Music is an important part of road trip experience.", columnThread.CT1),
  [uuid()]: new Column("Destination 2", [duplicateEvidence(items[5]), duplicateEvidence(items[27])], "Flexibility is important in road trips.", columnThread.CT2),
  [uuid()]: new Column("Destination 3", [duplicateEvidence(items[34]), duplicateEvidence(items[36])], "People choose road trips because of the lack of other options.", columnThread.CT3),
  [uuid()]: new Column("Destination 4", [duplicateEvidence(items[17]), duplicateEvidence(items[28])], "People mostly eat snacks on road trips.", columnThread.CT2),
};
