const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const orderBy = req.query.orderBy;
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

    if (req.query.searchBy === "name") {
      const searchValue = req.query.searchValue;
      if (!searchValue)
        return res.status(400).json({ message: "Please provide search value" });
      const regex = new RegExp(searchValue, "i");

      results.results = await User.find({
        $or: [{ name: regex }],
      })
        .limit(limit)
        .skip(startIndex)
        .exec();
      if (results.results.length === 0) {
        return res.status(404).json({
          message: ` ${searchValue} Not found`,
        });
      }
      return res.status(200).json({ results });
    } else if (req.query.sortBy === "age") {
      if (orderBy === "asc") {
        results.results = await User.find({})
          .sort({ age: 1 })
          .limit(limit)
          .skip(startIndex)
          .exec();
        return res.status(200).json({ results });
      } else if (orderBy === "desc") {
        results.results = await User.find({})
          .sort({ age: -1 })
          .limit(limit)
          .skip(startIndex)
          .exec();
        return res.status(200).json({ results });
      } else {
        return res.status(404).json({
          response: "Please provide orderBy value",
        });
      }
    } else {
      return res.status(404).json({
        response: "Invalid searchBy or sortBy",
      });
    }
  } catch (error) {
    console.error({ error });
    return res.status(500).json({
      response: error.message,
    });
  }
};
