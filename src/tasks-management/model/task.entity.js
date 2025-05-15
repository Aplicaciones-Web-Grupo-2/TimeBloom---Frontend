/**
 * Task
 * @description Task entity for the application
 */
export class Task {
    constructor(id, title, description, priority, status, due_date, reminder_time, category, user_id) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;         // ALTA, MEDIA, BAJA
        this.status = status;             // PENDIENTE, EN PROGRESO, COMPLETADA
        this.due_date = due_date;
        this.reminder_time = reminder_time;
        this.category = category;         // ESTUDIO, TAREAS DOMESTICAS, OTROS
        this.user_id = user_id;
    }

    /**
     * Create a new Task instance from a displayableTask
     * @param displayableTask - Task in displayable format (e.g., from UI or API)
     * @returns {Task}
     */
    static fromDisplayableTask(displayableTask) {
        return new Task(
            displayableTask.id,
            displayableTask.title,
            displayableTask.description,
            displayableTask.priority,
            displayableTask.status,
            displayableTask.due_date,
            displayableTask.reminder_time,
            displayableTask.category,
            displayableTask.user_id
        );
    }

    /**
     * Convert a Task to a displayable format (for table or card views)
     * @param task - The task entity
     * @returns {object}
     */
    static toDisplayableTask(task) {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            due_date: task.due_date,
            reminder_time: task.reminder_time,
            category: task.category,
            user_id: task.user_id
        };
    }

    /**
     * Get display label for status
     */
    get statusLabel() {
        switch (this.status) {
            case 'PENDIENTE': return 'Pendiente';
            case 'EN PROGRESO': return 'En progreso';
            case 'COMPLETADA': return 'Completada';
            default: return 'Desconocido';
        }
    }

    /**
     * Get display label for priority
     */
    get priorityLabel() {
        switch (this.priority) {
            case 'ALTA': return 'Alta';
            case 'MEDIA': return 'Media';
            case 'BAJA': return 'Baja';
            default: return 'Desconocida';
        }
    }
}
