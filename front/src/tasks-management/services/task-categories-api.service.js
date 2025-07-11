import http from "../../shared/services/http-common.js";

export class TaskCategoriesApiService {
    getAll(){
        return http.get('/task-categories');
    }

    getById(id){
        return http.get(`/task-categories/${id}`);
    }

    create(taskResource){
        return http.post(`/task-categories`, taskResource);
    }

    update(id,taskResource){
        return http.put(`/task-categories/${id}`, taskResource);
    }

    delete(id){
        return http.delete(`/task-categories/${id}`);
    }

}