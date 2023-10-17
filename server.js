const app = require("./src/app");
const { db } = require("./db/connection")
const port = 3000;

const userRouter = require('./src/routes/musicians')

app.use('/musicians', userRouter)

app.listen(port, () => {
    db.sync();
    console.log(`Listening at http://localhost:${port}/musicians`)
})