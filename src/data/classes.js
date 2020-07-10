import uuid from "uuid/v4";

export function Evidence(quote, tags, createdBy, participant, context, commentThread) {
  this.id = uuid();
  this.quote = quote;                 // string
  this.tags = tags;                   // tag <object> []
  this.createdBy = createdBy;         // member <object>
  this.participant = participant;     // participant <object>
  this.context = context;             // {start: "", end: ""}
  this.commentThread = commentThread; // comment <object> []

  this.quoteid = uuid();
  this.mapped = 0;

  this.hasTag = function(tag){
    return this.tags.includes(tag);
  }
}

export function Column(name, items) {
  this.name = name;

  if (items === undefined) {
    this.items = [];
  } else {
    this.items = items;
  }
}

export function Tag(name, color) {
  this.name = name;
  this.color = color;
  this.id = uuid();
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
