import connectMongo from "../../../config/database";
import {deleteApplication, getApplications, postApplication, putApplication} from "./controller";

const Applications = (req, res) => {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );
  const { method } = req;

  switch (method) {
    case "GET":
      getApplications(req, res);
      break;
    case "POST":
      postApplication(req, res);
      break;
    case "PUT":
      putApplication(req, res);
      break;
    case "DELETE":
      deleteApplication(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default Applications;
