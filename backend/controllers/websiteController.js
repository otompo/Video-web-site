import Website from '../models/websiteModel';

// homepage, getHomepage
export const createPage = async (req, res) => {
  try {
    const { page } = req.body;
    const found = await Website.findOne({ page });

    if (found) {
      // update
      const updated = await Website.findOneAndUpdate({ page }, req.body, {
        new: true,
      });
      return res.json(updated);
    } else {
      // create
      const created = await new Website(req.body).save();
      return res.json(created);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPage = async (req, res) => {
  try {
    const { page } = req.query;
    const found = await Website.findOne({ page });
    return res.json(found);
  } catch (err) {
    console.log(err);
  }
};
