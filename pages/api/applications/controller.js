/** Applications Controller */
import Applications from "../../../model/applications";
import JobPosts from "../../../model/jobPost";
import Users from "../../../model/user";

// Get: /api/application
export async function getApplications(req, res) {
  const { userid, page = 1, limit = 10 } = req.query;
  if (userid) {
    try {
      const applications = await Applications.find({"userId": userid}).populate('userId', {model:Users}).populate('jobPostId', {model:JobPosts});
      if (!applications) return res.status(404).json({ error: "No Applications Found" });
      res.status(200).json(applications);
    } catch (error) {
      res.status(404).json({ error: "Error in fetching Applications" });
    }
  }
  try {
    const applications = await Applications.find({}).populate('userId', {model:Users}).populate('jobPostId', {model:JobPosts})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({_id: -1})
    .exec();
    if (!applications) return res.status(404).json({ error: "No Applications Found" });
    const count = await Applications.countDocuments();
    res.status(200).json({
      totalResults: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      applications
    });
  } catch (error) {
    res.status(404).json({ error: "Error in fetching Applications" });
  }
}

// Get: /api/application/{id}
export async function getApplication(req, res) {
  try {
    const { applicationId } = req.query;
    if (applicationId) {
      const application = await Applications.findById(applicationId).populate('userId', {model:Users}).populate('jobPostId', {model:JobPosts});
      if (!application) return res.status(404).json({ error: "No Application Found" });
      return res.status(200).json(application);
    }
    res.status(404).json({ error: "Application Id Not Provided" });
  } catch (error) {
    res.status(404).json({ error });
  }
}

// Post: /api/application
export async function postApplication(req, res) {
  try {
    const applicationData = req.body;
    if (!applicationData)
      return res.status(404).json({ error: "Application Data Not Valid" });
    await Applications.create(applicationData, (err, data) => {
      if (err) {
        return res.status(401).json(err);
      }
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error });
  }
}

// Put: /api/application/{id}
export async function putApplication(req, res) {
  try {
    const { applicationId } = req.query;
    const applicationData = req.body;
    if (applicationId && applicationData) {
      const application = await Applications.findByIdAndUpdate(applicationId, applicationData);
      res.status(200).json(application);
    }
    res.status(404).json({ error: "Application Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error Updating the Application" });
  }
}

// Delete: /api/application/{id}
export async function deleteApplication(req, res) {
  try {
    const { applicationId } = req.query;
    if (applicationId) {
      await Applications.findByIdAndDelete(applicationId);
      return res.status(200).json({ deleted: applicationId });
    }
    res.status(404).json({ error: "Application Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error Deleting the Application" });
  }
}
