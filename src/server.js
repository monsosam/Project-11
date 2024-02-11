import express from "express";

import apiRoutes from "./routes/apiR";
import htmlRoutes from "./routes/htmlR";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));


app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});