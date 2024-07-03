const router = require('express').Router();
const middleware = require('../middlewares/middleware');
const newsControllers = require('../Controllers/newsControllers');
const newsModel = require('../models/newsModel'); // Assuming newsModel is correctly defined

// Dashboard endpoints
router.post('/api/news/add', middleware.auth, newsControllers.add_news);
router.put('/api/news/update/:news_id', middleware.auth, newsControllers.update_news);
router.put('/api/news/status-update/:news_id', middleware.auth, newsControllers.update_news_update);
router.get('/api/images', middleware.auth, newsControllers.get_images);
router.post('/api/images/add', middleware.auth, newsControllers.add_images);
router.get('/api/news', middleware.auth, newsControllers.get_dashboard_news);
router.get('/api/news/:news_id', middleware.auth, newsControllers.get_dashboard_single_news);
router.delete('/api/news/delete/:news_id', middleware.auth, newsControllers.delete_news);

// Website endpoints
router.get('/api/all/news', newsControllers.get_all_news);
router.get('/api/popular/news', newsControllers.get_popular_news);
router.get('/api/latest/news', newsControllers.get_latest_news);
router.get('/api/images/news_gallery', newsControllers.get_images_news);
router.get('/api/categorynews/news/:category', newsControllers.get_categorynews);


router.get('/api/details/news/:slug', newsControllers.get_news);
router.get('/api/category/all', newsControllers.get_categories);

module.exports = router;
