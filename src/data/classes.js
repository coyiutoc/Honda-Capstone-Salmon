import uuid from "uuid/v4";

export function Evidence(quote, tags, createdBy, participant, context, commentThread, quoteid = uuid()) {
  this.id = uuid();
  this.quote = quote;                 // string
  this.tags = tags;                   // tag <object> []
  this.createdBy = createdBy;         // member <object>
  this.participant = participant;     // participant <object>
  this.context = context;             // {start: "", end: ""}
  this.commentThread = commentThread; // comment <object> []
  this.quoteid = quoteid;
  this.mapped = 0;

  this.hasTag = function(tag){
    return this.tags.includes(tag);
  }
}

export const sumTags = (items) => {
  for (let item of items) {
    for (let tag of item.tags) {
      tag.numEvidence++;
    }
  }
}

export function Column(name, items = [], text = undefined) {
  this.name = name;
  this.items = items;
  this.text = text;
  this.starred = false;

  this.toggleStar = function() {
    this.starred = !this.starred;
  }  
}

export function Tag(name, color) {
  this.name = name;
  this.color = color;
  this.id = uuid();
  this.numEvidence = 0;
}

export function Member(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.initials = (firstName[0] + lastName[0]).toUpperCase();
}

export function Participant(id, occupation, companySize, note) {
  this.id = id;
  this.occupation = occupation;
  this.companySize = companySize;
  this.note = note;
}

export function Comment(member, text, date) {
  this.member = member;
  this.text = text;
  this.date = date.format("ddd, hA"); // convert moment() to string
}
