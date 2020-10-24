/* eslint-disable no-console */
/* eslint-disable global-require */
const router = require('express').Router();
const { generalFunctions } = require('./libraries');
const { modules: { unmount, deauth } } = require('./config/index');
const authenticate = require('./middlewares/auth.middleware');
// const { pgHook } = require('./modules/finance/finance.handler');

const modules = {};
const fsp = generalFunctions('fsPromise', ['readdir']);

// eslint-disable-line new-cap

router.get('/health-check', (req, res) => res.send('OK'));

const mountModulesAndRouters = async () => {
  const useModules = await fsp('./src/modules');
  useModules.forEach((m) => {
    try {
      if (unmount.includes(m) !== -1) {
        // eslint-disable-next-line import/no-dynamic-require
        modules[`${m}Routes`] = require(`./modules/${m}/${m}.routes`);
        if (deauth.includes(m)) {
          if (process.env.NODE_ENV === 'development') console.log(`${m} is unrestricted via auth`);
          router.use(`/${m}`, modules[`${m}Routes`]);
        } else {
          if (process.env.NODE_ENV === 'development') console.log(`${m} is bound via auth`);
          router.use(`/${m}`, authenticate, modules[`${m}Routes`]);
        }
      }
    } catch (exc) {
      console.log(exc);
      if (exc.code === 'MODULE_NOT_FOUND') {
        console.log(`${m} is API-free`);
      }
    }
  });
};

mountModulesAndRouters();

// router.route('/finance/responseHook')
//   .post(pgHook);

// const authRoutes = require('./modules/auth/auth.routes');
// const teacherRoutes = require('./modules/teacher/teacher.routes');


/** GET /health-check - Check service health */

// mount auth routes at /auth
// router.use('/auth', authRoutes);

// router.use('/teacher', teacherRoutes);

// Validating all the APIs with jwt token.
// router.use(expressJwt({ secret: config.jwtSecret }));

// If jwt is valid, storing user data in local session.
// router.use((req, res, next) => {
//   const authorization = req.header('authorization');
// eslint-disable-next-line max-len
//   res.locals.session = JSON.parse(Buffer.from((authorization.split(' ')[1]).split('.')[1], 'base64').toString()); // eslint-disable-line no-param-reassign
//   next();
// });

module.exports = router;
