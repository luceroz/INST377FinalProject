const express = require("express");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
const { request } = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

const supabaseUrl = "https://buufcfkqvdmzrswtvyow.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dWZjZmtxdmRtenJzd3R2eW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNDg2ODIsImV4cCI6MjA0OTYyNDY4Mn0.bZbsj8N8_DE9PyeYNJz1S-2WvGoqImvDc7c6Qwu3rKI";
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/", async (req, res) => {
  const { data, error } = await supabase.from("listings").select();

  if (error) {
    console.log("Error: ", error);
    res.send(error);
  } else {
    console.log("Successfully Retrieved");
    res.send(data);
  }
});

app.post("/listing", async (req, res) => {
  console.log("Attempting to add listing");
  console.log("Request", req.body);

  const title = req.body.title;
  const medium = req.body.medium;
  const describe = req.body.description;
  const price = req.body.price;
  const image = req.body.image;
  const artist = req.body.artist_name;

  const { data, error } = await supabase
    .from("listings")
    .insert({
      title: title,
      medium: medium,
      description: describe,
      price: price,
      image: image,
      artist_name: artist,
    })
    .select();

  if (error) {
    console.log("Error: ", error);
    res.send(error);
  } else {
    console.log("Successfully Retrieved");
    res.send(data);
  }
});

app.listen(port, () => {
  console.log(`Express app lsitening on port: ${port}`);
});
