const multer = require("multer");
const path = require('path');
const fs = require('fs');

const mimeCategories = {
  image: {//Image Formats:- JPEG: image/jpeg, PNG: image/png, GIF: image/gif, BMP: image/bmp, WebP: image/webp, SVG: image/svg+xml, TIFF: image/tiff, ICO: image/x-icon, HEIF: image/heif, HEIC: image/heic
    commonImgFormats: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'],
    webImages: ['image/svg+xml', 'image/bmp', 'image/webp', 'image/x-icon']
  
  },
  video: {//MP4:- video/mp4, WebM: video/webm, Ogg: video/ogg, AVI: video/x-msvideo, MOV: video/quicktime, MKV: video/x-matroska, WMV: video/x-ms-wmv FLV: video/x-flv 
    flv: ['video/x-flv']
  },
  audio: {//Audio Formats:- MP3: audio/mpeg, WAV: audio/wav, OGG: audio/ogg, M4A: audio/mp4, AAC: audio/aac, FLAC: audio/flac, Opus: audio/opus
    ringtoneExclusive: ['audio/ogg', 'audio/opus']
  },
  
  
  
  documents: {

    

    text: ['text/plain', 'text/html', 'text/css', 'text/javascript', 'text/csv', 'text/xml', 'text/markdown','application/json', 'application/xml', 'application/javascript'],
    office: ['application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint',
             'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
             'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
             'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    database: ['application/x-sqlite3', 'application/x-hdf5']
    
    
    
  },
  archive: {
    zip: ['application/zip'],
    rar: ['application/x-rar-compressed'],
    gzip: ['application/gzip'],
    tar: ['application/x-tar'],
    '7z': ['application/x-7z-compressed']
  },
  font: {
    
    
    
    
    
    ttf: ['font/ttf'],
    otf: ['font/otf'],
    woff: ['font/woff'],
    woff2: ['font/woff2']
  }
  
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {//here the file parameter contains the files uploaded and req only has the textual data that is sent via api calls of fetch or axios
    
    let uploadPath = 'upload/';
    
    
    if (file.mimetype.startsWith('image/')) {
      uploadPath = path.join(uploadPath, 'images/');
      if (mimeCategories.image.webImages.includes(file.mimetype)) {
        uploadPath = path.join(uploadPath, 'webImages/');
      }
    } else if (file.mimetype.startsWith('video/')) {
      uploadPath = path.join(uploadPath, 'videos/');
      
      
      
    } else if (
      mimeCategories.documents.text.includes(file.mimetype
        ||mimeCategories.documents.database.includes(file.mimetype)
        || mimeCategories.documents.office.includes(file.mimetype)
      ) 
    ){
      uploadPath = path.join(uploadPath, 'documents/');
    }
    else {
      
      return cb(new Error('Unsupported file type'), null);
    }

    
    const userDirectory = path.join(uploadPath, req.body.userId);
    fs.mkdir(userDirectory, { recursive: true }, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, userDirectory);
    });
  },
  
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});


const defaultFileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'text/plain',
    'audio/mpeg',
    'video/mp4',
    
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('Invalid file type'), false); 
  }
};
const upload = (sizeLimitInMB, filesToInclude = null) => {
  
  const radix = parseInt(process.env.NumbersystemUsedForConversion, 10) || 10;

  
  const sizeLimitInBytes = sizeLimitInMB
    ? sizeLimitInMB * 1024 * 1024
    : process.env.MAX_FILE_SIZE_MB
      ? parseInt(process.env.MAX_FILE_SIZE_MB, radix) * 1024 * 1024
      : undefined;

  
  const fileFilter = (req, file, cb) => {
    if (filesToInclude) {
      
      const allowedTypes = Array.isArray(filesToInclude) ? filesToInclude : [filesToInclude];

      
      const extname = path.extname(file.originalname).toLowerCase();
      const mimeType = file.mimetype.toLowerCase();

      if (allowedTypes.includes(extname) || allowedTypes.includes(mimeType)) {
        cb(null, true); 
      } else {
        cb(new Error('File type not allowed'), false); 
      }
    } else {
      
      defaultFileFilter(req, file, cb);
    }
  };
  
  return multer({
    storage: storage,
    
    fileFilter: fileFilter || defaultFileFilter,
    limits: { fileSize: sizeLimitInBytes },
    
  });
};
module.exports = { upload };
