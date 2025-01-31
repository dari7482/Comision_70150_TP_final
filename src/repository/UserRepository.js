
import GenericRepository from "./GenericRepository.js";

export default class UserRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }

    getUserByEmail = (email) => {
        return this.getBy({ email });
    }
    getUserById = (id) => {
        return this.getBy({ _id: id })
    }
    updateLoad = (userId, fileArray) => {
        let result = this.dao.updateLoad(userId, fileArray)
        return result


    }

}