import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for this collection. */
class ClubsCollection {
  constructor() {
    this.name = 'ClubsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
    //  _id: String,
      // Forces name of club to be unique and checks if name already exists in database. Does same for other fields.
      name: {
        type: String,
        unique: true,
        validate: {
          nameValidator: async nameToFind => this.collection.findOne({ name: nameToFind }),
          errorMsg: prop => `The ${prop.path} ${prop.value} is already in use! Please try a different name...`,
        },
      },
      image: {
        type: String,
        unique: true,
        validate: {
          imageValidator: async imageToFind => this.collection.findOne({ image: imageToFind }),
          errorMsg: prop => `The ${prop.path} ${prop.value} is already being used! Please try a different image...`,
        },
      },
      description: {
        type: String,
        unique: true,
        validate: {
          descriptionValidator: async descToFind => this.collection.findOne({ description: descToFind }),
          errorMsg: prop => `The ${prop.path} ${prop.value} is already being used! Please write a different description...`,
        },
      },
      /*
        meetingTimes is an exception if we assume each club will meet in different locations at the same time.
        If we want to enforce that each club meets at a different time, we can add a validator to check if any clubs are meeting in the same place, at the same time.
      */
      meetingTimes: String,
      contact: {
        type: String,
        unique: true,
        validate: {
          contactValidator: async contactToFind => this.collection.findOne({ contact: contactToFind }),
          errorMsg: prop => `The ${prop.path} ${prop.value} is already being used! Please try a different contact...`,
        },
      },
      tags: {
        type: [String],
        validate: {
          // Needs to be passed an array of valid club types. Might define valid clubs once we figure them out and pass them to here.
          itemValidator: async array => array.every(element => ['Test', 'Test2', 'Test3'].includes(element)),
          errorMsg: element => `${element} is not a valid club type!`,
        },
      },
    }.isRequired());

    this.collection.attachSchema(this.schema);
    this.userPublications = `${this.name}.publication.user`;
    this.adminPublications = `${this.name}.publication.admin`;
  }
}

export const Clubs = new ClubsCollection();
