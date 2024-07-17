import connectMongo from "../../../config/database";
import { getAssessment, putAssessment, deleteAssessment } from "./controller";

const Assessments = (req, res) => {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  const { method } = req;

  switch (method) {
    case "GET":
      getAssessment(req, res);
      break;
    case "PUT":
      putAssessment(req, res);
      break;
    case "DELETE":
      deleteAssessment(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default Assessments;
