import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for this collection. */
class ClubsCollection {

  constructor() {
    this.name = 'ClubsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
    //  _id: String,
      name: { type: String, unique: true, required: true, min: 1, max: 100 },
      image: { type: String, unique: true, required: true, min: 1, max: 255 },
      description: { type: String, unique: true, required: true, min: 1, max: 500 },
      meetingTimes: { type: String, required: true, min: 1, max: 24 },
      contact: { type: String, required: true, min: 1, max: 100 },
      tags: { type: Array, required: true, min: 1, max: 6 },
      'tags.$': {
        type: String,
        allowedValues: ['Religion', 'Honor Society', 'Martial Arts', 'Ethnic', 'Food', 'Other'],
        min: 1,
        max: 14,
      },
    });

    this.collection.attachSchema(this.schema);
    this.userPublications = `${this.name}.publication.user`;
    this.adminPublications = `${this.name}.publication.admin`;
  }
}

export const Clubs = new ClubsCollection();
