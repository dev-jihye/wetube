import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const isHeroku = process.env.NODE_ENV === 'production';

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: 'wetube-jihye',
  acl: 'public-read',
  key: function (request, file, ab_callback) {
    const newFileName = Date.now() + '-' + file.originalname;
    const fullPath = 'images/' + newFileName;
    ab_callback(null, fullPath);
  },
});

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: 'wetube-jihye',
  acl: 'public-read',
  key: function (request, file, ab_callback) {
    const newFileName = Date.now() + '-' + file.originalname;
    const fullPath = 'videos/' + newFileName;
    ab_callback(null, fullPath);
  },
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = 'Wetube';
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isHeroku = isHeroku;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash('error', 'Login First');
    res.redirect('/login');
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash('error', 'Not authorized');
    return res.redirect('/');
  }
};

export const avatarUpload = multer({
  dest: 'uploads/avatars/',
  limits: {
    fileSize: 3000000,
  },
  storage: isHeroku ? s3ImageUploader : undefined,
});

export const videoUpload = multer({
  dest: 'uploads/videos/',
  limits: {
    fileSize: 10000000,
  },
  storage: isHeroku ? s3VideoUploader : undefined,
});

export const s3DeleteAvatarMiddleware = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  s3.deleteObject(
    {
      bucket: 'wetube-jihye',
      key: `images/${req.session.user.avatarURL.split('/')[4]}`,
    },
    (err, data) => {
      if (err) {
        throw err;
      }
    }
  );
  next();
};
