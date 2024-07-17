/** User Controller */
import Users from "../../../model/user";

// Get: /api/users
export async function getUsers(req, res) {
  const { page = 1, limit = 10 } = req.query;
  try {
    const users = await Users.find({})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({_id: -1})
    .exec();
    if (!users) return res.status(404).json({ error: "No User Found" });
    const count = await Users.countDocuments();
    res.status(200).json({
      totalResults: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      users
    });
  } catch (error) {
    res.status(404).json({ error: "Error in fetching Users" });
  }
}

// Get: /api/users/{id}
export async function getUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await Users.findById(userId);
      if (!user) return res.status(404).json({ error: "No User Found" });
      return res.status(200).json(user);
    }
    res.status(404).json({ error: "User Id Not Provided" });
  } catch (error) {
    res.status(404).json({ error });
  }
}

// Post: /api/users
export async function postUser(req, res) {
  try {
    const userData = req.body;
    if (!userData)
      return res.status(404).json({ error: "Form Data Not Valid" });
    await Users.create(userData, (err, data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error });
  }
}

// Put: /api/users/{id}
export async function putUser(req, res) {
  try {
    const { userId } = req.query;
    const userData = req.body;
    if (userId && userData) {
      const user = await Users.findByIdAndUpdate(userId, userData);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "User Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error Updating the User" });
  }
}

// Delete: /api/users/{id}
export async function deleteUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      await Users.findByIdAndDelete(userId);
      return res.status(200).json({ deleted: userId });
    }
    res.status(404).json({ error: "User Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error Deleting the User" });
  }
}
