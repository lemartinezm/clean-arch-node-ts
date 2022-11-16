import mongoose from "mongoose";
import { ContactSchema } from "../../../interfaces/dataSources/mongodb/models/contactModel";

const contactSchema = new mongoose.Schema<ContactSchema>({
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
});

export const ContactModel = mongoose.model("Contact", contactSchema);
