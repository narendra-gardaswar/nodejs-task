const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await User.estimatedDocumentCount().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = await User.find().limit(limit).skip(startIndex).exec();
    return res.status(200).json({ results });
  } catch (error) {
    console.error({ error });
    return res.status(500).json({
      error: error.message,
    });
  }
};
