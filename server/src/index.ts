import express, {Application, Request, Response} from "express"
import "dotenv/config"
import * as path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const app:Application  = express();
const PORT = process.env.PORT || 7000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// * Set View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));


// *Queues
// import { emailQueue, emailQueueName } from "./jobs/EmailQueue.js";

// app.get('/',async(req:Request,res:Response)=>{
//     const html  = await ejs.renderFile(__dirname+`/views/emails/welcome.ejs`,{name:"Devansh Rai"});
//     // await sendMail("YOUR_EMAIL","Testing SMTP",html);
//     // return res.send("Hey how are you!!!");
//     await emailQueue.add(emailQueueName,{to:"raianupam2023@gmail.com", subject:"Testing Queues",html:html});

//     return res.send("Email sent successfully!!");
//     // res.send("Hello World!");
// });



// *Routes
import routes from "./routing/index.js";
app.use("/", routes);


app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
});


