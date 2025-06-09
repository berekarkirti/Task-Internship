const express = require('express');
const router = express.Router();
const { getCourses, addCourse, upload } = require('../controllers/courseController');

router.get('/', getCourses);
router.post('/', upload.single('video'), addCourse);

module.exports = router;