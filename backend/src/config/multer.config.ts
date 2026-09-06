import multer from 'multer';
import path from 'node:path';

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.resolve(__dirname, '../..', 'uploads'));
    },
    filename: function (req, file, callback) {
        const time = new Date().getTime();
        callback(null, `${time}_${file.originalname}`);
    },
});

export const upload = multer({ storage: storage });
