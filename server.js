const express = require("express");
const app = express();
const { seeder } = require("./db/index");

const init = async () => {
  try {
    await seeder();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`app listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
