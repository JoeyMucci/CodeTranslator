# Code Translator
We are using RedwoodJS to build a full-stack application to translate code between different programming languages. 
As programmers, we hope to be able to make use of this application ourselves when it is complete. 
In order to actually translate the code, we will employ GPT-3, a large language model, or LLM. 

Our repository is split into two main components: the web folder and the api folder. 
These folders represent the frontend and the backend, respectively. 
Inside of each is a src folder, where most of the code that runs the application will be.

In web, the src folder contains our pages, as well as our components and layouts, hallmarks of the React framework that Redwood uses.
Inside our components we will also have various cells, which are Redwood specific entities that are responsible for fetching their own data to display. 
One more important file in the web folder is routes.jsx, which sets all the urls for our different pages. 

In api, the src folder contains our services, which are various functions we perform by querying from the database Redwood provides. 
Under the graphql folder are .sdl files where we define CRUD (create, read, update, delete) operations that our app supports various for items we store in our database. 
Importantly, under the db folder are our migrations and schema provided by Prisma, which handles our database operations. 
