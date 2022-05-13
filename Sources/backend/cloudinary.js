import cloudinary from 'cloudinary';
import dotenv from 'dotenv';


dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRECT
})

const uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                _id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}
const remove = (idImage) => {
    return new Promise(resolve =>{
        cloudinary.uploader.destroy(idImage);
        resolve ({check : true})
    })
}
export default uploads;