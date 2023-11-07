import { Note } from '../models/Note.js';

import { ITEMS_PER_PAGE } from '../utils/constants.js';

const getDashboardPage = async (req, res, next) => {
  const page = req.query.page || 1;

  try {
    const user = req.user;
    const notes = await Note.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { userId: user._id } },
      {
        $project: {
          title: { $substr: ['$title', 0, 20] },
          body: { $substr: ['$body', 0, 100] },
        },
      },
    ])
      .skip(ITEMS_PER_PAGE * page - ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .exec();

    const noteCount = await Note.countDocuments();

    res.render('pages/dashboard/index', {
      notes,
      current: page,
      title: 'Dashboard',
      userName: user.firstName,
      layout: '../views/layouts/dashboard',
      description: 'Free Nodejs Notes App.',
      pages: Math.ceil(noteCount / ITEMS_PER_PAGE),
    });
  } catch (error) {
    next(error);
  }
};

const getAddNewNotePage = (req, res, next) => {
  res.render('pages/dashboard/new-note', {
    layout: '../views/layouts/dashboard.ejs',
  });
};

const getNoteDetailedPage = async (req, res, next) => {
  const { id } = req.params;

  try {
    const userId = req.user._id;

    const note = await Note.findById(id).where({ userId }).lean();
    if (!note) {
      const error = new Error('Note not found!');
      error.status = 404;
      throw error;
    }

    res.render('pages/dashboard/view-note', {
      note,
      noteId: id,
      layout: '../views/layouts/dashboard',
    });
  } catch (error) {
    next(error);
  }
};

const getSearchNotePage = (req, res, next) => {
  res.render('pages/dashboard/search', {
    searchResults: '',
    layout: '../views/layouts/dashboard.ejs',
  });
};

const addNewNoteHandler = async (req, res, next) => {
  const { title, body } = req.body;

  try {
    const userId = req.user._id;

    await Note.create({
      title,
      body,
      userId,
    });
    res.redirect('/dashboard');
  } catch (error) {
    next(error);
  }
};

const updateNoteHandler = async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const userId = req.user._id;

    await Note.findByIdAndUpdate(id, { $set: { title, body } }).where({
      userId,
    });
    res.redirect('/dashboard');
  } catch (error) {
    next(error);
  }
};

const searchNoteHandler = async (req, res, next) => {
  const { searchTerm } = req.body;

  try {
    const userId = req.user._id;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');

    const searchResults = await Note.find({
      userId,
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, 'i') } },
        { body: { $regex: new RegExp(searchNoSpecialChars, 'i') } },
      ],
    });

    res.render('pages/dashboard/search', {
      searchResults,
      layout: '../views/layouts/dashboard',
    });
  } catch (error) {
    next(error);
  }
};

const deleteNoteHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const userId = req.user._id;
    await Note.findByIdAndDelete(id).where({ userId });

    res.redirect('/dashboard');
  } catch (error) {
    next(error);
  }
};

export default {
  getDashboardPage,
  getAddNewNotePage,
  getSearchNotePage,
  getNoteDetailedPage,
  deleteNoteHandler,
  searchNoteHandler,
  addNewNoteHandler,
  updateNoteHandler,
};
