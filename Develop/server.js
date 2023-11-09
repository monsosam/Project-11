const express = require("express");

const apiRoutes = require("./routes/apiR");
const htmlRoutes = require("./routes/htmlR");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use("/api", apiR);
app.use("/", htmlR);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});