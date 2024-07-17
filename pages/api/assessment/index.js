import connectMongo from "../../../config/database";
import {deleteAssessment, getAssessments, postAssessment, putAssessment} from "./controller";

const Assessments = (req, res) => {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );
  const { method } = req;

  switch (method) {
    case "GET":
      getAssessments(req, res);
      break;
    case "POST":
      postAssessment(req, res);
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
