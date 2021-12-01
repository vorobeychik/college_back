const planModel = require('./plan.model');

class PlanService {
    async createPlan(plan) {
        return planModel.create({...plan})
    }

    async getPlan(type){
        return planModel.findOne({ type })
    }

    async getPlans(){
        return planModel.find({})
    }
}


module.exports = new PlanService();