require("dotenv").config();
const { app } = require("./app");
const { dbConnect } = require("./config/database");
const port = process.env.PORT;

// await client.connect(); 
// await client.db("admin").command({ ping: 1 });

app.listen(port, async ()=>{
    console.log(`Server is runnig at http://localhost:${port}`);
    await dbConnect();
});
