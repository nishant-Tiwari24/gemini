import { error } from "console"
import app from "./app.js"
import { connectToDatabase } from "./db/connection.js"

const port = process.env.PORT || 5008;
connectToDatabase()
  .then(() => {
    app.listen(5023, () => console.log("Server open"))
  })
  .catch((error) => console.log(error))