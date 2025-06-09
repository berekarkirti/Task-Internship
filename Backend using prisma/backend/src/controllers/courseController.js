const prisma = require('../db');
const { uploadVideo } = require('../utils/cloudinary');
const multer = require('multer');
const path = require('path');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => 
  {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => 
  {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => 
  {
    const filetypes = /mp4|mov|avi|mkv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) 
    {
      return cb(null, true);
    } 
    else 
    {
      cb(new Error('Only video files are allowed!'));
    }
  },
});

// Get all courses
const getCourses = async (req, res) => 
{
  try 
  {
    const courses = await prisma.course.findMany();
    res.status(200).json({ data: courses });
  } 
  catch (error) 
  {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// Add a new course
const addCourse = async (req, res) => 
{
  const { title, description } = req.body;
  const videoFile = req.file;

  if (!videoFile) 
  {
    return res.status(400).json({ error: 'No video file uploaded' });
  }

  try 
  {
    // Upload video to Cloudinary
    const videoUrl = await uploadVideo(videoFile);
    console.log('Video uploaded to Cloudinary:', videoUrl);

    // Save course to MongoDB with the Cloudinary video URL
    const course = await prisma.course.create({
      data: 
      {
        title,
        description,
        videoUrl,
      },
    });

    res.status(201).json(course);
  } 
  catch (error) 
  {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Failed to add course' });
  }
};

module.exports = { getCourses, addCourse, upload };