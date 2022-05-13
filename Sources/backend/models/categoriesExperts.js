import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
  
    },
    { timestamps: true }
  );

  export default  mongoose.model('categoriesExpers', schema);