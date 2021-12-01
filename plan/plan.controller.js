const { Router } = require('express');
const PlanService = require('./plan.service')
const router = Router();


router.post('/create',async (req, res) => {
    const requestBody = req.body;
    const film = await PlanService.createPlan(requestBody);

    res.json({message:'created'})

})

router.get('/',async (req, res) => {
    const requestBody = req.body;
    const films = await PlanService.getPlans();

    res.json( films )

})

module.exports = router;