import multer from "multer"

const storage = multer.memoryStorage()

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5mb
    }
})

export default upload