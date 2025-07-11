import http from "../../shared/services/http-common.js";


export class TasksApiService {

    getAll(){
        return http.get('/tasks');
    }

    getById(id){
        return http.get(`/tasks/${id}`);
    }

    create(taskResource){
        return http.post(`/tasks`, taskResource);
    }

    update(id,taskResource){
        return http.put(`/tasks/${id}`, taskResource);
    }

    delete(id){
        return http.delete(`/tasks/${id}`);
    }


}