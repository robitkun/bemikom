import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads_events/');
  },
  filename: (req, file, cb) => {
    const uniqSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
  } else {
    cb(null, true);
  }
};

export const upload = multer({ storage, fileFilter });
