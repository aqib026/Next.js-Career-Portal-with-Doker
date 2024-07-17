import { Schema, models, model } from "mongoose";

const applicationSchema = new Schema({
  userId: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  jobPostId: [{ type: Schema.Types.ObjectId, ref: 'jobPost' }],
  appliedOn: "date",
  applicationStatus: "string",
  evaluationStatus: "string",
  evaluationResult: "string",
  evaluationCode: "string",
});

const Applications = models.application || model("application", applicationSchema);
export default Applications;