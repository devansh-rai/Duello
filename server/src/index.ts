import express, {Application, Request, Response} from "express"
import "dotenv/config"
import * as path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import { sendMail } from "./config/mail.js";

const app:Application  = express();
const PORT = process.env.PORT || 7000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.get('/',async(req:Request,res:Response)=>{
    const html  = await ejs.renderFile(__dirname+`/views/emails/welcome.ejs`,{name:"Devansh Rai"});
    await sendMail("YOUR_EMAIL","Testing SMTP",html);
    return res.send("Email sent successfully");
    // return res.send("Hey how are you!!!");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
});

