import { PrismaClient } from "@prisma/client";
// import { env } from "prisma/config";
const prisma = new PrismaClient({
  log: ["error", "query"],
  errorFormat: "pretty",
});

export default prisma;
