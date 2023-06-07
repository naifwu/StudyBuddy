const { validationResult } = require('express-validator');
const StudyGroup = require('../models/StudyGroup');
const ChatMessage = require('../models/ChatMessage');

const createStudyGroup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, description } = req.body;

    const newStudyGroup = new StudyGroup({ name, description });
    await newStudyGroup.save();

    res.status(201).json({ message: 'Study group created successfully.' });
  } catch (error) {
    next(error);
  }
};

const getStudyGroup = async (req, res, next) => {
  try {
    const { studyGroupId } = req.params;
    const studyGroup = await StudyGroup.findById(studyGroupId).populate('members');
    res.json(studyGroup);
  } catch (error) {
    next(error);
  }
};

const addMember = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { studyGroupId } = req.params;
    const { userId } = req.body;

    const studyGroup = await StudyGroup.findById(studyGroupId);
    studyGroup.members.push(userId);
    await studyGroup.save();

    res.json({ message: 'Member added successfully.' });
  } catch (error) {
    next(error);
  }
};

const getStudyGroupMessages = async (req, res, next) => {
  try {
    const { studyGroupId } = req.params;

    const messages = await ChatMessage.find({ studyGroup: studyGroupId }).populate('sender');
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudyGroup,
  getStudyGroup,
  addMember,
  getStudyGroupMessages,
};