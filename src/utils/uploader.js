import __dirname from "./index.js";
import multer from 'multer';
import fs from 'fs'

const extensionFile = (fileName) => {



    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg|heic)$/i;
    if (imageRegex.test(fileName.originalname)) {


        return `${__dirname}/../public/img`
    } else {

        return `${__dirname}/../public/documents`

    }
}

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        const fielExt = extensionFile(file)
        cb(null, fielExt)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({ storage })

export default uploader;