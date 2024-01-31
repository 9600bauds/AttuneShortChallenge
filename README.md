
# Coding Challenge

## Description

To test your familiarity or ability to pick up our stack, we will ask you to perform 2 tasks:
- Modify a CRUD API that uses Node, Typescript, and the Firestore Emulator
- Create a tiny react project that uses the previously mentioned API

When you finish both tasks (or as much as you are able to), please do the following:
- Upload this repository (with your changes) into your own private repository on GitHub
- Invite the GitHub users `AngelFHC` and `CrisFHC` to your repository

## Task 1

The entire project will run locally on your machine using Firebase's emulators for their cloud services. The API uses Express and sits behind a Firebase function. All the API routes are already stubbed out. Your task is to fill them out. All the specifications are in the comments in [functions/src/index.ts](functions/src/index.ts).

Read the comments closely: they contain a few tips that will clarify certain peculiarities of Firestore.

- Implement the stubbed out APIs in [functions/src/index.ts](functions/src/index.ts), there are only 3 and these are marked with `TODO`

- If something does not make sense or is not very clear in the specification, use your best judgement to infer what was needed


### Task 1 Pre-requisites (if you already have these on your machine, you may not need to do these steps)
- Install [Node.js](https://nodejs.org/en)
    - To verify that you have node installed, open your terminal and run `node -v`
- Install [OpenJDK](https://jdk.java.net/21/) (needed for the local Firestore emulator)
    - These [instructions](https://www.freecodecamp.org/news/install-openjdk-free-java-multi-os-guide/) may help
    - To verify that you have JDK installed, open your terminal and run `java -version`

### Task 1 Setup
- Clone this repository to your machine

- Install Firebase Tools globally `npm install -g firebase-tools`

- In your terminal, navigate to the respository and to the `functions` directory to run: `npm install`

- To start the API and the database emulator, sumply run `npm run conc`
    - To verify that the API started properly, in your browser go to the URL that is defined by:
        - `[Firebase] ✔  functions[]: http function initialized (...)` in the terminal
        - It should look something like `http://127.0.0.1:5001/challenge-project/us-central1/api`
        - Once you open this URL in your browser, you should see `alive 💪` as a response
    - Do the same for the database, this one sits inside a table:
        - `View in Emulator UI` > `Firestore`
        - It should look something like `http://127.0.0.1:4000/firestore`
        - Once you open this URL in your browser, you should see a UI for the firestore database with a few pre-populated collections

### Task 1 Notes
- All the code is in the `functions` folder, and you only need to modify the files in the `/src/index.ts` file
- Every single time you rerun `npm run conc`, your data will be erased on the Firestore Emulator and replaced with a base set of data, be careful!
- If you are ever confused at what objects your APIs should create, look at the prepopulated objects in the Firestore through the `Emulator UI`


## Task 2

This is more of an open-ended task: using the most recent version of React, you should create a tiny webapp where you can see a table that displays the `quizzes` information from Task 1.

We only have a few requirements:
- Make use of the API you modified in Task 1
- Make sure that the table's data is updated automatically
- Make sure it's mobile friendly
- Add the project in the root folder, and name it `client`

Note: Your webapp does NOT need to be able to create/delete quizzes, it only needs to display the data 
