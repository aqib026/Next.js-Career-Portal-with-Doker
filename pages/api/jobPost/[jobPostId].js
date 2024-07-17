import connectMongo from "../../../config/database";
import { getJobPost, putJobPost, deleteJobPost } from "./controller";

const JobPosts = (req, res) => {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  const { method } = req;

  switch (method) {
    case "GET":
      getJobPost(req, res);
      break;
    case "PUT":
      putJobPost(req, res);
      break;
    case "DELETE":
      deleteJobPost(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default JobPosts;
