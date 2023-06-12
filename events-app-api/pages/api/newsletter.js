import { connectDataBase, insertDocument } from "../../helpers/db-util";

// 1 POST REQUEST
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "invalid email address" });
      return;
    }

    let client;

    try {
      client = await connectDataBase();
    } catch (error) {
      res.status(500).json({ message: "connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email });
    } catch (error) {
      res.status(500).json({ message: "inserting data failed!" });
      return;
    }

    client.close();

    res.status(201).json({ message: "signed up!" });
  }
}
