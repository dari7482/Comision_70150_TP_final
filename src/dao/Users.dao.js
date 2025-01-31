import userModel from "./models/User.js";


export default class Users {

    get = (params) => {

        return userModel.find(params);
    }

    getBy = async (params) => {
        return await userModel.findOne(params);

    }

    save = (doc) => {
        return userModel.create(doc);
    }

    update = (id, doc) => {

        return userModel.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {
        return userModel.findByIdAndDelete(id);
    }

    updateLoad = async (userId, fileArray) => {
        return await userModel.findByIdAndUpdate(
            userId,
            { $push: { documents: { $each: fileArray } } },
            { new: true }
        );


    }

}