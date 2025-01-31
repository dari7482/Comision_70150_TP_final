import adoptionModel from "./models/Adoption.js";

export default class Adoption {

    get = (params) => {
        return adoptionModel.find(params);
    }

    getBy = async (params) => {


        let result = await adoptionModel.findOne(params);

        return result
    }

    save = (doc) => {
        return adoptionModel.create(doc);
    }

    update = (id, doc) => {
        return adoptionModel.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {
        return adoptionModel.findByIdAndDelete(id);
    }
}