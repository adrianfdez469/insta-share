# CubanEng

### Used tech-stack
- Base Build: [Nx](https://nx.dev) (monorepo)
- Frontend: NextJs + Apollo client (GraphQl) 
- Backend: NestJs + GraphQl + Mongoose + RabbitMQ
- DB: MongoDB
- Infrastructure Dependencies: Docker (docker compose)
- Message broker: RabbitMQ
- Versioning System: Git

## How to run on dev enviroment

- clone project `git clone GITHUB_URL`
- enter project folder `cd PROJECT_FOLDER_NAME`
- install dependencies `npm i`
- run project `npx nx run-many --parallel --target=serve --projects=insta-share,api,compressor`
-  Navigate to http://localhost:4200/


Artefacts:
  apps
    - insta-share: nextjs web application
    - api:
      - express-api: Handles uploads and downloads (File System) (graphql is no used for know's security issues)
      - graphql-api: Handles, user creation, login, files metada management (db), files listing, and others.
    - compressor: Microservice that handles the compression of files on the disk.


App flow:
  - Anonymous user creates a user on app.
  - User login to app
  - User uploads a file through upload nestjs+express endpoint
  - Express upload endpoint publish a "UPLOADED_FILE" message to RabbitMQ
  - The files Controller listen to this "UPLOADED_FILE" RMQ msg and saves the file in database and after it makes a push notification to the frontend (graphql subscriptions) to update the user files list.
  - Simultaneously to this last step, the compressor microservice who is listening too to the "UPLOADED_FILE" msg, finds the file on disc, publish a "START_COMPRESSING" message, and start compress the file, after file is compressed, it publish a "FILE_COMPRESSED" msg.
  - This messages ("START_COMPRESSING" and "FILE_COMPRESSED") are listened by the files controller and on each message, it 
    saves the status ("COMPRESSING"/"COMPRESSED") of the file on the DB, and after each update it makes a push notification to the frontend (graphql subscription). 
  



Recommendation:
 - No test of any kind (don't have the time to implement unit tests, integration or end-to-end tests with cypress)
 - Files are stored on server file system because AWS and GCP (the most popular that have buckets to save files (AWS-S3, GCP-Google Cloud Storage)) needs an international credit card even for a free plan.
 - Authentication and authorization are not implemented the best way. I should have a middleware that appends to the request the userId, for further process know the real user reaching an endpoint.
 - Maybe use Server Side Rendering or Static Regeneration to populate the files page (NextJs features).