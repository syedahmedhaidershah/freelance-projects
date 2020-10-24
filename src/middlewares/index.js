const Authenticate = require('./auth.middleware');

const RoleAccess = require('./roleAccess.middleware');
const BlockAdmin = require('./blockAdmin.middleware');
const BlockParent = require('./blockParent.middleware');
const BlockStudent = require('./blockStudent.middleware');
const BlockTeacher = require('./blockTeacher.middleware');

module.exports = {
  Authenticate,
  RoleAccess,
  BlockAdmin,
  BlockParent,
  BlockStudent,
  BlockTeacher,
};
