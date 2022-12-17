# CubanEng

### Used tech-stack
- Base Build: [Nx](https://nx.dev) (monorepo)
- Frontend: NextJs + Apollo client (GraphQl) 
- Backend: Nest + GraphQl + Mongoose
- DB: MongoDB
- Infrastructure Dependencies: Docker (docker compose)
- Others: Git
- Cloud: ...
## How to run on dev enviroment

- clone project `git clone GITHUB_URL`
- enter project folder `cd PROJECT_FOLDER_NAME`
- install dependencies `npm i`
- run project `npx nx run-many --parallel --target=serve --projects=insta-share,api`
-  Navigate to http://localhost:4200/



App -> App del Front NodeJs (Se gestion todo el frontend de la aplicacion)
GraphQl API -> NestJs (Gestiona la parte del backend de la aplicacion)
  -> Usa MongoDB para guardar la informacion del usuario y del fichero
  -> Bucket S3 / Google Storage para subir archivos
  -> Servicio para almacenar los secretos (estos se descargan en tiempo de arranque del servicio y se guardan en memoria)


