/** Job Posts Controller */
import JobPosts from "../../../model/jobPost";

// Get: /api/jobPost
export async function getJobPosts(req, res) {
  const { page = 1, limit = 10 } = req.query;
  try {
    const jobPosts = await JobPosts.find({}).populate('assessmentId')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({_id: -1})
    .exec();
    if (!jobPosts) return res.status(404).json({ error: "No Job Posts Found" });
    const count = await JobPosts.countDocuments();
    res.status(200).json({
      totalResults: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      jobPosts
    });
  } catch (error) {
    res.status(404).json({ error: "Error in fetching Job Posts" });
  }
}

// Get: /api/jobPost/{id}
export async function getJobPost(req, res) {
  try {
    const { jobPostId } = req.query;
    if (jobPostId) {
      const jobPost = await JobPosts.findById(jobPostId).populate('assessmentId');
      if (!jobPost) return res.status(404).json({ error: "No Job Post Found" });
      return res.status(200).json(jobPost);
    }
    res.status(404).json({ error: "Job Post Id Not Provided" });
  } catch (error) {
    res.status(404).json({ error });
  }
}

// Post: /api/jobPost
export async function postJobPost(req, res) {
  try {
    const jobPostData = req.body;
    if (!jobPostData)
      return res.status(404).json({ error: "Job Post Data Not Valid" });
    await JobPosts.create(jobPostData, (err, data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error });
  }
}

// Put: /api/jobPost/{id}
export async function putJobPost(req, res) {
  try {
    const { jobPostId } = req.query;
    const jobPostData = req.body;
    if (jobPostId && jobPostData) {
      const jobPost = await JobPosts.findByIdAndUpdate(jobPostId, jobPostData);
      res.status(200).json(jobPost);
    }
    res.status(404).json({ error: "Job Post Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error Updating the Job Post" });
  }
}

// Delete: /api/jobPost/{id}
export async function deleteJobPost(req, res) {
  try {
    const { jobPostId } = req.query;
    if (jobPostId) {
      await JobPosts.findByIdAndDelete(jobPostId);
      return res.status(200).json({ deleted: jobPostId });
    }
    res.status(404).json({ error: "Job Post Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error Deleting the Job Post" });
  }
}
