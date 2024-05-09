import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for this collection. */
class ClubsCollection {

  constructor() {
    this.name = 'ClubsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
    //  _id: String,
      name: { type: String, unique: 'true', required: true, min: 1, max: 100 },
      image: { type: String, unique: 'true', required: true, min: 1, max: 255 },
      description: { type: String, unique: 'true', required: true, min: 1, max: 1000 },
      meetingTimes: { type: String, required: true, min: 1, max: 50 },
      contact: { type: String, required: true, min: 1, max: 100 },
      tags: { type: Array, required: true, min: 1, max: 7 },
      'tags.$': {
        type: String,
        allowedValues: ['Academic', 'Religion', 'Honor Society', 'Martial Arts', 'Ethnic', 'Food', 'Other'],
        min: 1,
        max: 14,
      },
      adminEmail: { type: String, unique: 'true', required: false, min: 1, max: 100 },
      favorited: { type: Array, unique: 'true', required: false, min: 0, max: 300 },
      'favorited.$': {
        type: String,
        min: 1,
        max: 100,
      },
    });

    this.collection.attachSchema(this.schema);
    this.userPublications = `${this.name}.publication.user`;
    this.adminPublications = `${this.name}.publication.admin`;
    this.clubAdminPublications = `${this.name}.publication.clubAdmin`;
  }
}

export const Clubs = new ClubsCollection();
