import mongoose, { model, Schema } from "mongoose";

const formSchema = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    sections: [
      {
        title: { type: String, required: true, trim: true },
        titleItem: {
          bold: { type: Boolean, default: false },
          underline: { type: Boolean, default: false },
          italic: { type: Boolean, default: false },
        },
        descItem: {
          bold: { type: Boolean, default: false },
          underline: { type: Boolean, default: false },
          italic: { type: Boolean, default: false },
        },
        desc: { type: String, trim: true, default: "" },
        order: { type: Number, default: 0 },
        questions: [
          {
            question: { type: String, required: true, trim: true },
            pic: { type: String },
            answerType: {
              type: String,
              enum: [
                "answer",
                "paragraph",
                "file",
                "time",
                "date",
                "dropdown",
                "checkbox",
                "choices",
              ],
              required: true,
            },
            answerText: { type: Schema.Types.Mixed },
            files: [{ type: String }],
            required: { type: Boolean, default: false },
            items: {
              bold: { type: Boolean, default: false },
              underline: { type: Boolean, default: false },
              italic: { type: Boolean, default: false },
            },
            options: [
              {
                text: { type: String, required: true },
                image: { type: String },
              },
            ],
          },
        ],
      },
    ],
    bgImg: { type: String },
    bgColor: { type: String },
    sizes: {
      header: { type: Number, default: 24 },
      question: { type: Number, default: 20 },
      text: { type: Number, default: 17 },
    },
    allFonts: {
      header: { type: [String], default: ['Roboto', 'Open Sans', 'sans-serif'] },
      question: { type: [String], default: ['Roboto', 'Open Sans', 'sans-serif'] },
      text: { type: [String], default: ['Roboto', 'Open Sans', 'sans-serif'] }
    },
  },
  { timestamps: true }
);

const Form = mongoose.models.Form || model("Form", formSchema);
export default Form;

