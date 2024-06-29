const router = require('express').Router()
const middleware = require('../middlewares/middleware')
const newsControllers = require('../Controllers/newsControllers')

//dashbord
router.post('/api/news/add',middleware.auth,newsControllers.add_news)
router.put('/api/news/update/:news_id',middleware.auth,newsControllers.update_news)
router.put('/api/news/status-update/:news_id',middleware.auth,newsControllers.update_news_update)
router.get('/api/images',middleware.auth,newsControllers.get_images)
router.post('/api/images/add',middleware.auth,newsControllers.add_images)

router.get('/api/news',middleware.auth,newsControllers.get_dashboard_news)
router.get('/api/news/:news_id',middleware.auth,newsControllers.get_dashboard_single_news)


// website //
// router.get('/api/all/news',middleware.auth,newsControllers.get_all_news)
router.get('/api/all/news',newsControllers.get_all_news)



module.exports = router