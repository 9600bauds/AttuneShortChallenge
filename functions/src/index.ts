import * as functions from 'firebase-functions';

import * as bodyParser from "body-parser";
import * as express from "express"

import * as admin from "firebase-admin"

import { asyncHandler, buildValidator } from "./middleware"
import Joi = require('@hapi/joi');
import { DocumentReference } from 'firebase-admin/firestore';


// 
// If you are not familiar with Firebase/firestore, that's ok! Here is some helpful documentation:
// (Make sure to scroll past all the setup instructions!)
// https://firebase.google.com/docs/firestore/query-data/get-data
//

admin.initializeApp()
const Firestore = admin.firestore()

const app = express();
app.use(bodyParser.json());

app.get("/", asyncHandler(async (request, response, next) => {
  response.send("alive 💪")
}))

/*
 *
 * TIP:
 * 
 * for field validation use Joi
 * there is a middleware `buildValidator` already defined
 * just figure out how to define the right Joi schema and use the middleware
 * 
 * the 'buildValidator' middleware will also handle all the errors
 */

/*
 *
 * TIP:
 * 
 * database models
 * 
 * USER:
 *   collection name: 'users'
 *   object structure:
 *     { 
 *       name: string, 
 *       quizIds: string[] (defaults to [])
 *     }
 * 
 * QUIZ:
 *   collection name: 'quizzes'
 *   object structure:
 *     { 
 *       name: string, 
 *       description: string, (optional)
 *       active: boolean,
 *       userCount: number (defaults to 0)
 *     }
*/

/*
 * EXAMPLE: create a user
 *
 * 
 * ROUTE: 
 *   POST /users
 *
 * Expected request body JSON:
 * {
 *   name: "Bob Builder"
 * }
 * 
 * Validation info:
 *   name: string (required, minimum length 1)
 *  
 * 
 * EXPECTED RESPONSE:
 * JSON
 * {
 *   "user": {
 *     "id": "uAWoWFpknToBcdZ7GF59",
 *     "quizIds": [],
 *     "name": "Bob Builder"
 *   }
 * }
 * 
 */

// These are the firestore collections where users and quizzes are stored
const usersColl = Firestore.collection("users")
const quizzesColl = Firestore.collection("quizzes")

//
// This is a sample Joi validation schema, for more info see its documentation
// https://joi.dev/api/?v=17.12.0
//
const userSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .required()
})

// 
// This is an example of how to use the buildValidator, as well as the firestore packages
// Try it out! Do a POST request to /users
//
app.post("/users",
  buildValidator(userSchema, "body"),
  asyncHandler(async (request, response, next) => {
    const userRef: DocumentReference = await usersColl.add({
      name: request.body.name,
      quizIds: []
    })

    const userDoc = await userRef.get()

    response.json({
      user: {
        id: userDoc.id,
        ...userDoc.data()
      }
    })
  }))

/*
 * get a user
 *
 * 
 * ROUTE: 
 *   GET /users/:userId
 *  
 * EXPECTED RESPONSE:
 * JSON
 * {
 *   "user": {
 *     "id": "uAWoWFpknToBcdZ7GF59",
 *     "quizIds": [],
 *     "name": "Bob Builder"
 *   }
 * }
 * 
 */
app.get("/users/:userId",
  asyncHandler(async (request, response, next) => {
    const userId = request.params.userId; //Extract from the URL params
    const userRef = usersColl.doc(userId);
    const userDoc = await userRef.get();

    response.json({
      user: {
        id: userDoc.id,
        ...userDoc.data()
      }
    })
  })
)


/*
 * create an individual quiz
 *
 * Expected request body JSON:
 * {
 *   name: "Quiz 2",
 *   description: "this is a quiz to do something",
 *   active: false
 * }
 * 
 * Validation info:
 *   name: string (required, can't be blank)
 *   description: string (optional, can't be blank if submitted)
 *   active: boolean (optional, defaults to false)
 * 
 * ROUTE: 
 *   POST /quizzes
 * 
 * EXPECTED RESPONSE:
 * JSON
 * {
 *   "quiz": {
 *     "id": "KltYLDxCbP5lX6BHWY9l",
 *     "description": "this is a quiz to do something",
 *     "active": false,
 *     "userCount": 0,
 *     "name": "Quiz 2",
 *     "createdOn": {
 *       "_seconds": 1595465567,
 *       "_nanoseconds": 643000000
 *     }
 *   }
 * }
 * 
 * 
 * TIP: for your createdOn value, you have 2 options:
 * Use firestore's documentSnapshot's createTime
 * or
 * Use a JS date object
 * 
 */
app.post("/quizzes",
  asyncHandler(async (request, response, next) => {

    const quizRef: DocumentReference = await quizzesColl.add({
      name: request.body.name,
      description: request.body.description, 
      active: request.body.active,
      // I prefer to set createdOn here, because Typescript does not like
      // the fact that firestore's documentSnapshot's createTime could be null.
      createdOn: new Date()
    })

    const quizDoc = await quizRef.get()

    response.json({
      quiz: {
        id: quizDoc.id,
        ...quizDoc.data(),
      }
    })
  })
)



/*
 * list latest 10 quizzes (ignore pagination)
 *
 * ROUTE: 
 *   GET /quizes
 * 
 * EXPECTED RESPONSE:
 * JSON
 * {
 *   quizes: [
 *      ... dump all the properties of the quiz ...,
 *      ... dump all the properties of the quiz ...,
 *      ...
 *   ]
 * }
 * 
 */
app.get("/quizzes",
  asyncHandler(async (request, response, next) => {
    
    // @TODO: IMPLEMENT ME

    response.json("IMPLEMENT ME")
  })
)

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);