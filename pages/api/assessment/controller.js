/** Assessment Controller */
import Assessment from "../../../model/assessment";

// Get: /api/assessment
export async function getAssessments(req, res) {
  const { page = 1, limit = 10 } = req.query;
  try {
    const assessments = await Assessment.find({})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({_id: -1})
    .exec();
    if (!assessments)
      return res.status(404).json({ error: "No Assessment Found" });
      const count = await Assessment.countDocuments();
      res.status(200).json({
        totalResults: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        assessments
      });
  } catch (error) {
    res.status(404).json({ error: "Error in fetching Assessment" });
  }
}

// Get: /api/assessment/{id}
export async function getAssessment(req, res) {
  try {
    const { assessmentId } = req.query;
    if (assessmentId) {
      const assessment = await Assessment.findById(assessmentId);
      if (!assessment)
        return res.status(404).json({ error: "No Assessment Found" });
      return res.status(200).json(assessment);
    }
    res.status(404).json({ error: "Assessment Id Not Provided" });
  } catch (error) {
    res.status(404).json({ error });
  }
}

// Post: /api/assessment
export async function postAssessment(req, res) {
  try {
    const assessmentData = req.body;
    if (!assessmentData)
      return res.status(404).json({ error: "Assessment Data Not Valid" });
    await Assessment.create(assessmentData, (err, data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error });
  }
}

// Put: /api/assessment/{id}
export async function putAssessment(req, res) {
  try {
    const { assessmentId } = req.query;
    const assessmentData = req.body;
    if (assessmentId && assessmentData) {
      const assessment = await Assessment.findByIdAndUpdate(
        assessmentId,
        assessmentData
      );
      res.status(200).json(assessment);
    }
    res.status(404).json({ error: "Assessment Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error Updating the Assessment" });
  }
}

// Delete: /api/assessment/{id}
export async function deleteAssessment(req, res) {
  try {
    const { assessmentId } = req.query;
    if (assessmentId) {
      await Assessment.findByIdAndDelete(assessmentId);
      return res.status(200).json({ deleted: assessmentId });
    }
    res.status(404).json({ error: "Assessment Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error Deleting the Assessment" });
  }
}
