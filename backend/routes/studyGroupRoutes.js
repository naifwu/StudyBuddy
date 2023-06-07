const express = require('express');
const router = express.Router();
const { createStudyGroup, getStudyGroup, addMember, getStudyGroupMessages } = require('../controllers/studyGroupController');
const { body } = require('express-validator');

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required.'),
    body('description').notEmpty().withMessage('Description is required.'),
  ],
  createStudyGroup
);

router.get('/:studyGroupId', getStudyGroup);

router.put(
  '/:studyGroupId/add-member',
  [
    body('userId').isMongoId().withMessage('User ID must be a valid MongoDB ObjectId.'),
  ],
  addMember
);

router.get('/:studyGroupId/messages', getStudyGroupMessages);

module.exports = router;