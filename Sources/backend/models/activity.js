import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      idCategory: {
        type: String,
        required: true,
      },
      nameCategory: {
        type: String,
        required: true,
      },
      image: {
        _id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
  
    },
    { timestamps: true }
  );

  export default  mongoose.model('activityModel', schema);