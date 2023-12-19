import { createReadStream, unlink } from "node:fs";
import express from "express";
import cors from "cors";
import { createObjectCsvWriter } from "csv-writer";
import { getFakes } from "./modules/fake-users.js";
import { RequestError } from "./modules/request-error.js";
import { parseParams } from "./modules/parse-params.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("../client/dist/"));

const ITEMS_PER_PAGE = 75;
const DOWNLOAD_QTY_LIMIT = 9999;

app.get("/api/:location", (req, res) => {
  try {
    const { seed, page, errorValue, location } = parseParams(req);
    if (!isFinite(seed) || seed === 0) throw new RequestError("Wrong seed");
    if (!isFinite(page) || page < 0) throw new RequestError("Wrong page");
    if (!isFinite(errorValue) || errorValue < 0) throw new RequestError("Wrong error value");

    return res.json(
      getFakes({
        location,
        seed,
        page,
        errorValue,
        itemsPerPage: ITEMS_PER_PAGE,
      })
    );
  } catch (error) {
    if (error instanceof RequestError) {
      return res.status(400).send(`Error: ${error.message}`);
    }
    return res.status(500).send("Something went wrong");
  }
});

app.get("/download-csv", async (req, res) => {
  try {
    const { seed, qty, errorValue, location } = parseParams(req);
    if (!isFinite(seed) || seed === 0) throw new RequestError("Wrong seed");
    if (!isFinite(qty) || qty <= 0 || qty > DOWNLOAD_QTY_LIMIT)
      throw new RequestError("Wrong quantity");
    if (!isFinite(errorValue) || errorValue < 0) throw new RequestError("Wrong error value");

    const users = getFakes({
      location,
      seed,
      page: 0,
      errorValue,
      itemsPerPage: qty,
    });

    const FILENAME = "users.csv";

    const csvWriter = createObjectCsvWriter({
      path: FILENAME,
      header: [
        { title: "no.", id: "idx" },
        { title: "Unique ID", id: "id" },
        { title: "Name", id: "name" },
        { title: "Email", id: "email" },
        { title: "Phone", id: "phone" },
        { title: "Address", id: "address" },
      ],
    });

    await csvWriter.writeRecords(users);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=${FILENAME}`);
    const fileStream = createReadStream(FILENAME);
    fileStream.pipe(res);
    fileStream.on("end", () => unlink(FILENAME, () => {}));
  } catch (error) {
    if (error instanceof RequestError) {
      return res.status(400).send(`Error: ${error.message}`);
    }
    return res.status(500).send("Something went wrong");
  }
});

const PORT = 3030;

app.listen(PORT, () => {
  console.clear();
  console.log("App is listening on port", PORT);
});
