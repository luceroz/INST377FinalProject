const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/public"));

const supabaseUrl = "https://buufcfkqvdmzrswtvyow.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dWZjZmtxdmRtenJzd3R2eW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNDg2ODIsImV4cCI6MjA0OTYyNDY4Mn0.bZbsj8N8_DE9PyeYNJz1S-2WvGoqImvDc7c6Qwu3rKI";
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/art", async (req, res) => {
  const { data, error } = await supabase.from("listings").select();

  console.log("Data Retrieved: ", data);
  console.log("Error: ", error);

  res.send(data);
});

app.listen(port, () => {
  console.log(`Express app lsitening on port: ${port}`);
});
