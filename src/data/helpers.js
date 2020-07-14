import { Evidence } from "data/classes.js";

// Totals number of evidence that have a tag
// and saves number to the tag object
export const sumTags = (items) => {
  for (let item of items) {
    for (let tag of item.tags) {
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
