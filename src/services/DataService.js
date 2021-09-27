import data from '../activities.json';

class DataService {

    getData() {
        return data;
    }
}

export default new DataService();