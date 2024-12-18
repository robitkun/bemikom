import contactService from '../service/contactService.js';
// contactController
const addContact = async (req, res, next) => {
  try {
    const response = await contactService.addContact(req.body);
    res.status(200).json({
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

export { addContact };
