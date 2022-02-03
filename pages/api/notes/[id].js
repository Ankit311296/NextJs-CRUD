import Note from "../../../models/Note";
import dbConnect from "./../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const note = await Note.findById(id);
        res.status(200).json({ success: true, data: note });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      const note = await Note.findByIdAndUpdate(id, req.body);
      if (!note) {
        res.status(400).json({ success: false });
      }
      res.status(200).json({ success: true, data: note });
      break;

    case "DELETE":
      const Deletenotes = await Note.deleteOne({ id, id });
      if (!Deletenotes) {
        res.status(400).json({ success: false });
      }
      res.status(200).json({ success: true, data: {} });
      break;
    default:
      res.status(400).json({ success: false });
  }
};
