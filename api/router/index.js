const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const boardController = require('../controllers/board-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
	body('email').isEmail(),
	body('password').isLength({min: 3, max: 32}),
	userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.post('/postBoard', boardController.postBoard);
router.put('/createBoard', userController.createBoard);
router.get('/getBoard/:idBoard', boardController.getBoard);
router.put('/addColumn', boardController.addColumn);

module.exports = router
