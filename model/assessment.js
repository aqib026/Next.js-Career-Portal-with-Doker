import { Schema, models, model } from "mongoose";

const assessmentSchema = new Schema({
  title: "string",
  description: "string",
  language: "string",
  timeDuration: "string",
  isHiddein : false,
  testRun:  "string",
  function: "string",
  comments : "string",
  test_cases: "array",
});

const Assessment = models.assessment || model("assessment", assessmentSchema);
export default Assessment;
