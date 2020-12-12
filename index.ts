import express from "express";
import short from "short-uuid";
import { urls } from "./database";

(async () => {
  try {
    const port = 3001;

    const app = express();

    app.set("view engine", "ejs");

    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: true,
      })
    );

    app.get("/", (req, res) => {
      res.render("index");
    });

    app.post("/new", async (req, res) => {
      res.render("shortened", {
        id: (
          await urls.create({
            id: short.generate(),
            url: req.body.url,
            uses: 0,
            maxUses: parseInt(req.body.maxUses),
          })
        ).getDataValue("id"),
      });
    });

    app.get("/:id", async (req, res) => {
      const url = await urls.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!url) return res.redirect("/");

      res.redirect(url.getDataValue("url"));

      url.increment("uses");

      url.save();

      if (url.getDataValue("uses") + 1 >= url.getDataValue("maxUses"))
        url.destroy();
    });

    app.listen(port, () => console.log(`Server listening on port ${port}!`));
  } catch (error) {
    console.error(error);
  }
})();
