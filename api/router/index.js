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
router.post('/postBoard', authMiddleware, boardController.postBoard);
router.put('/createBoard', authMiddleware, userController.createBoard);
router.get('/getBoard/:idBoard', authMiddleware, boardController.getBoard);
router.put('/addColumn', authMiddleware, boardController.addColumn);
router.put('/changeColumns', authMiddleware, boardController.changeColumns);
router.put('/addCard', authMiddleware, boardController.addCard);

module.exports = router
