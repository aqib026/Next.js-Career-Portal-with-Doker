import { Schema, models, model } from "mongoose";
import Assessment from "./assessment";

const jobPostSchema = new Schema({
    title: "string",
    description: "string",
    assessmentId: [{ type: Schema.Types.ObjectId, ref: Assessment }],
    hiringStatus: "string",
    minExperience: "string",
    datePosted: "string",
    jobType: "string",
    jobLocation: "string",
    jobResponsibilities: [],
    jobSkills: [],
    jobContractLength: "string",
    salary: "string",
    isHiddein: false
    
});

const JobPosts = models.jobPost || model("jobPost", jobPostSchema);
export default JobPosts;
