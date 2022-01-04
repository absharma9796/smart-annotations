# Smart Annotations Interface ( S.A.I )
![alt logo](https://github.com/absharma9796/smart-annotations/blob/master/web/public/psyduck.jpg)

S.A.I is a Frontend application for annotating Audio Data.

## Tech Stack
**Frontend** - NextJS, Typescript, Redux, TailwindCss, Framer-Motion
**Backend** - NextJS native server, **json files** used to mimick as a local DB and 
utility functions have been written `(using nodejs fs module)` to update json files to mimick

## Installation

**S.A.I** requires [Node.js](https://nodejs.org/) v12.22.0 to run.
Install the dependencies and devDependencies and start the server.
```sh
cd web
yarn install
yarn dev
```

For production environments...

```sh
yarn build
yarn start
```

## Folder Structure

![alt Folder Structure](https://github.com/absharma9796/smart-annotations/blob/master/web/public/folder_structure.png)

All the `source code` related to Frontend can be found inside
/web/src folder

1. src/component contains all the components for business logic
2. src/dataTypes contains interfaces / types for base objects, e.g User, Dataset, DataPoint. 
   as well as actual data files in `json` format e.g. users.json, datasets.json
3. src/middlewares contains middlewares for NextJS server side api routes 
4. src/utils contains utility functions
    Important Utility Functions
      - `checkConsensusState.ts` - Decides if consensus achieved when a user labels a datapoint
      - `checkDatasetTagged.ts` - Decides if dataset should be marked tagged when a users labels a datapoint
      - `rewardUserScore` - Increases user score once consensus is achieved for a datapoint
      - `crudApis.ts` - Mimicks as a read/write/update/delete api to local json files

## Application Screens -

## 1. Login 
### A simple email and password authentication mechanism has been setup 

![alt Folder Structure](https://github.com/absharma9796/smart-annotations/blob/master/web/public/login_screen.png)

Sample users that can be used are
  1. `Admin` - email - `iamadmin@gmail.com` , password - `qwerty1234` 
  2. `Reviewer` - email - `iamreviewer@gmail.com` , password - `qwerty1234` 
  3. `Member` - email - `iammember@gmail.com` , password - `qwerty1234` 
  
## 2. After Login - Datasets Home Screen

By default 2 datasets have been added 
  1. Cats vs Dogs Dataset
  2. Customer Care Dataset
  
![alt Dataset Screen after login](https://github.com/absharma9796/smart-annotations/blob/master/web/public/dataset_screen.png)

### An admin can choose to add more datasets by clicking on `Add Dataset` button

---
`NOTE`
Due to time constraints by default all datasets are being added to project_id 1
---

## 3. Datapoints Viewing / Uploading Screen

One can Navigate here by clicking on any of the datasets in previous page (Datasets Homescreen)

![alt Datapoint tagging screen](https://github.com/absharma9796/smart-annotations/blob/master/web/public/datapoint_screen.png)

### To upload datapoints click on `Add / Import Data` ( use `yarn dev` i.e development server to test import functionality)
🚨🚨 **`Caveats`** 🚨🚨

Since public folder of nextjs is being used to store and fetch audio files,
any files uploaded in production i.e after `yarn build` and `yarn start` won't show up - 

[As per Next JS](https://nextjs.org/docs/basic-features/static-file-serving)
Note: Only assets that are in the public directory at build time will be served by Next.js. Files added at runtime won't be available.

## 3. Datapoints Labelling Screen

One can Navigate here by clicking on `🏷️ Start Labeling` button in previous screen

![alt Labeling Screen](https://github.com/absharma9796/smart-annotations/blob/master/web/public/datapoint_labeling_screen.png)
  

## Consensus and Scoring Logic 
Consensus and Scoring logic has been implemented in the frontend itself

Consensus is checked for a datapoint, every time a user annotates that datapoint

- A consensus is achieved and datapoint is marked as `COMPLETE` if 
the count of majority people with same labels on a datapoint equals or exceeds `minimum_consensus`
- If Consensus is achieved winners are awarded by increasing their average score
- `Average score` is calculated based on -- (previousScore*annotation_count + 1) / (annotation_count)
- `annotation_count` is the number of datapoints a particular `user` has labelled historically and is incremented everytime
a user labels a datapoint.


### P.S - 
Time Constraints might reflect in the source code written in a hurry 😅,
Definitely a room for improvements for a more production ready application.
