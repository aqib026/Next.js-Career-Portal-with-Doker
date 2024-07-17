import connectMongo from "../../../config/database";
import { getUsers, postUser, putUser } from "./controller";

const Users = (req, res) => {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );
  const { method } = req;

  switch (method) {
    case "GET":
      getUsers(req, res);
      break;
    case "POST":
      postUser(req, res);
      break;
    case "PUT":
      putUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default Users;
