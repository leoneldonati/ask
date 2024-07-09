import { v2 as cld } from "cloudinary";

cld.config({
  api_key: import.meta.env.CLD_API_KEY,
  api_secret: import.meta.env.CLD_API_SECRET,
  cloud_name: import.meta.env.CLD_NAME,
});

async function uploadFile(path: string, options?: { folder: string }) {
   try {
    const {secure_url, public_id} = await cld.uploader.upload(path, { folder: options.folder })

    return {
      ok: true,
      data: {
        secureUrl: secure_url,
        publicId: public_id
      }
    }
   }
   catch (err) {
    return {
      ok: false,
      error: 'Error on upload file.'
    }
   }
}

export { uploadFile }
