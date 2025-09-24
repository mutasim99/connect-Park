import axios from "axios";


export const imageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const {data}= await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API_KEY}`, formData)
    return data.data?.display_url
}