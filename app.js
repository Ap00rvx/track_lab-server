const express = require('express')
const db= require('./config/database_connection')
const dotenv = require("dotenv")
const userRoutes = require("./routes/user_routes");
const orgRoutes = require("./routes/organization_routes");
dotenv.config()


db(process.env.DATABASE_URL);

const app = express()
const port = process.env.PORT || 3000
app.use(express.json()); 


app.use("/api/u/",userRoutes);
app.use("/operable/org/",orgRoutes);

app.get('/', (req, res) => res.json('Welcome to Track Lab!'))
app.listen(port, () => console.log(`listening on port ${port}!`))