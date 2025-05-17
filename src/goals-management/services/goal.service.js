import httpInstance from "../../shared/services/http-common.js";

export class GoalService {

    resourceEndpoint = "/goals"; // import.meta.env.VITE_GOALS_ENDPOINT_PATH;

    /**
     * Retrieves all goals
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to an array of goals
     */
    getAll() {
        return httpInstance.get(this.resourceEndpoint);
    }

    /**
     * Retrieves a goal by its ID
     * @param {number|string} id - The ID of the goal to retrieve
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the goal object
     */
    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Creates a new goal
     * @param {Object} resource - The goal object to create
     * @param {string} resource.title - The title of the goal
     * @param {string} resource.category - The category of the goal
     * @param {string} resource.status - The status of the goal
     * @param {string} resource.priority - The priority of the goal
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the created goal
     */
    create(resource) {
        return httpInstance.post(this.resourceEndpoint, resource);
    }

    /**
     * Updates an existing goal
     * @param {number|string} id - The ID of the goal to update
     * @param {Object} resource - The updated goal data
     * @param {string} resource.title - The title of the goal
     * @param {string} resource.category - The category of the goal
     * @param {string} resource.status - The status of the goal
     * @param {string} resource.priority - The priority of the goal
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the updated goal
     */
    update(id, resource) {
        return httpInstance.put(`${this.resourceEndpoint}/${id}`, resource);
    }

    /**
     * Deletes a goal by its ID
     * @param {number|string} id - The ID of the goal to delete
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves when the goal is deleted
     */
    delete(id) {
        return httpInstance.delete(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Retrieves goals by title
     * @param {string} title - The title to search for
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to an array of matching goals
     */
    getByName(title) {
        return httpInstance.get(`${this.resourceEndpoint}?name=${title}`);
    }

}