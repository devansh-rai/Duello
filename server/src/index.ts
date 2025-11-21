import express, {Application, Request, Response} from "express"
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import ExpressFileUpoad from "express-fileupload";
import { createServer, Server as HttpServer } from "http";
import * as path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import { Server } from "socket.io";

const app:Application  = express();
const PORT = process.env.PORT || 7000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const server: HttpServer = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

export { io };
setupSocket(io);

// *middleware
app.use(cors());
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use(express.json());
app.use(
  ExpressFileUpoad({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


// * Set View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));


// *Queues
import "./jobs/index.js";
app.get("/", async (req: Request, res: Response) => {
  const hoursDiff = checkDateHourDifference("2024-07-15T07:36:28.019Z");
  
  return res.json({ message: hoursDiff });
});


// *Routes
import routes from "./routing/index.js";
import { checkDateHourDifference } from "./helper.js";
import { setupSocket } from "./socket.js";
app.use("/", routes);


server.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
});


