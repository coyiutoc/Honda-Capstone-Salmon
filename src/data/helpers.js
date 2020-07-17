import { Evidence, Comment } from "data/classes.js";
import { tags, members, participants } from "data/dummyData.js";
import moment from "moment";

// Totals number of evidence that have a tag
// and saves number to the tag object
export const sumTags = (items) => {
  for (let item of items) {
    for (let tag of item.tags) {
      if (tag === undefined) { debugger; }
      tag.numEvidence++;
    }
  }
}

// Makes the original evidence mapped
// and returns a duplicate evidence
export const duplicateEvidence = (copyme) => {
  copyme.mapped++;
  return new Evidence(
    copyme.quote,
    copyme.tags,
    copyme.createdBy,
    copyme.participant,
    copyme.context,
    copyme.commentThread,
    copyme.quoteid
  );
}

export const parseEvidence = (data) => {
  let items = [];

  for (let d of data) {
    let etags = [];
    if (d["Tags"].includes("[")) {
      let rawIDs = d["Tags"].slice(1,-1).split(",");
      etags = rawIDs.map(t => "T" + t).map(id => tags[id]);
    } else {
      let tagID = "T" + d["Tags"];
      etags.push(tags[tagID]);
    }

    let memberID = "M" + d["CreatedBy"];
    let participantID = "P" + d["ParticipantID"];
    let startContext = d["Starting Context"] === "" ? null : d["Starting Context"];
    let endContext = d["Ending Context"] === "" ? null : d["Ending Context"];
    let comments = [];
    
    for (let i = 1; i <= 3; i++) {
      let key = "MemberID" + i;
      if (d[key] !== "") {
        let memberID = "M" + d[key];
        let textKey = "Text" + i;
        let textVal = d[textKey];
        comments.push(new Comment(members[memberID], textVal, moment().day(-1)))
      }
    }

    let e = new Evidence(d["Quote"],
                         etags,
                         members[memberID],
                         participants[participantID],
                         {start: startContext, end: endContext},
                         comments)
    
    items.push(e);
  }

  // Aggregate # of occurrences for each tag
  sumTags(items);

  return items;
}
