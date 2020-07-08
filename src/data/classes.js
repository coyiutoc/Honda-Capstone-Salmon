import uuid from "uuid/v4";

export function Evidence(quote, tags, createdBy, source, mapped) {
  this.id = uuid();
  this.quote = quote;
  this.tags = tags;
  this.createdBy = createdBy;
  this.source = source;
  this.mapped = mapped;
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
