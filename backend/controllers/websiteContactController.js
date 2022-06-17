import WebsiteContact from '../models/websiteContactModel';

// homepage, getHomepage
export const createContactPage = async (req, res) => {
  try {
    const { page } = req.body;
    const found = await WebsiteContact.findOne({ page });

    if (found) {
      // update
      const updated = await WebsiteContact.findOneAndUpdate(
        { page },
        req.body,
        {
          new: true,
        },
      );
      return res.json(updated);
    } else {
      // create
      const created = await new WebsiteContact(req.body).save();
      return res.json(created);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getContactPage = async (req, res) => {
  try {
    const { page } = req.query;
    const found = await WebsiteContact.findOne({ page });
    return res.json(found);
  } catch (err) {
    console.log(err);
  }
};
