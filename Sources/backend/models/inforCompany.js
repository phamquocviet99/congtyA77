import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      website: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
  
    },
    { timestamps: true }
  );
  
  export default  mongoose.model('inforCompany', schema);