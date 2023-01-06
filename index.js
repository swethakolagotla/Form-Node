import {URL} from "url";
import http from "http";
import { readFile, writeFile } from "./utils/fileaccess.js";
const server = http.createServer(async (req, res) => {
  try {
    const instanceOfURL = new URL(req.url, "http://localhost:8000/");
    if(req.method==="GET"&& instanceOfURL.pathname==="/form"){
  let jsonData = await readFile("./public/form.html");
  res.writeHead(200, { "Content-Type": "text/html" });
      return res.end( jsonData);
    }
    // POST Method
    else if (req.method === "POST" && instanceOfURL.pathname === "/users") {
      let payload = "";
      req.on("data", (data) => {
        payload += data.toString() ;
      });
      req.on("end", async () => {
        let finalData = JSON.parse(await readFile("./data/users.json","UTF-8"));
        payload = JSON.parse(payload);
       finalData.push(payload);
        console.log(finalData)
        await writeFile("./data/users.json", JSON.stringify(finalData));
       res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`{
            "status": "Successfully added !"
           }`);
      });
    } else {
      res.end("Server says Hello !");
    }
  } catch (err) {
    console.log(err);
    res.writeHead(500);
    res.end("Server crashed, things not working as expected.");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to the port 8000...");
});
