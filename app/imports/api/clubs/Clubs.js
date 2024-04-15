import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for this collection. */
class ClubsCollection {
  constructor() {
    this.name = 'ClubsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
    //  _id: String,
      name: { type: String, unique: true },
      image: { type: String, unique: true },
      description: { type: String, unique: true },
      meetingTimes: String,
      contact: { type: String, unique: true },
      tags: Array,
      'tags.$': {
        type: String,
        allowedValues: ['Religion', 'Honor Society', 'Martial Arts', 'Ethnic', 'Other'],
      },
    }.isRequired);

    this.collection.attachSchema(this.schema);
    this.userPublications = `${this.name}.publication.user`;
    this.adminPublications = `${this.name}.publication.admin`;
  }
}

export const Clubs = new ClubsCollection();
