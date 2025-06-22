import http from "../../shared/services/http-common.js";

export class GoalApiService {
    /**
     * Retrieves all goals
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to an array of goals
     */
    getAll(){
        return http.get('/goals');
    }

    /**
     * Retrieves a goal by its ID
     * @param {number|string} id - The ID of the goal to retrieve
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the goal object
     */
    getById(id){
        return http.get(`/goals/${id}`);
    }

    /**
     * Creates a new goal
     * @param {Object} goalResource - The goal object to create
     * @param {string} goalResource.title - The title of the goal
     * @param {string} goalResource.category - The category of the goal
     * @param {string} goalResource.status - The status of the goal
     * @param {string} goalResource.priority - The priority of the goal
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the created goal
     */
    create(goalResource){
        return http.post(`/goals`, goalResource);
    }

    /**
     * Updates an existing goal
     * @param {number|string} id - The ID of the goal to update
     * @param {Object} goalResource - The updated goal data
     * @param {string} goalResource.title - The title of the goal
     * @param {string} goalResource.category - The category of the goal
     * @param {string} goalResource.status - The status of the goal
     * @param {string} goalResource.priority - The priority of the goal
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the updated goal
     */
    update(id, goalResource){
        return http.put(`/goals/${id}`, goalResource);
    }

    /**
     * Deletes a goal by its ID
     * @param {number|string} id - The ID of the goal to delete
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves when the goal is deleted
     */
    delete(id){
        return http.delete(`/goals/${id}`);
    }

}