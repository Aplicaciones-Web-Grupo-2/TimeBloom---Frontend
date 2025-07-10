/**
 * Goal
 * @description Goal entity for the application
 */
export class Goal {
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
     * Create a new Goal instance from a displayableGoal
     * @param displayableGoal - Goal in displayable format (e.g., from UI or API)
     * @returns {Goal}
     */
    static fromDisplayableGoal(displayableGoal) {
        return new Goal(
            displayableGoal.id,
            displayableGoal.title,
            displayableGoal.description,
            displayableGoal.priority,
            displayableGoal.status,
            displayableGoal.due_date,
            displayableGoal.reminder_time,
            displayableGoal.category,
            displayableGoal.user_id
        );
    }

    /**
     * Convert a Goal to a displayable format (for table or card views)
     * @param goal - The goal entity
     * @returns {object}
     */
    static toDisplayableGoal(goal) {
        return {
            id: goal.id,
            title: goal.title,
            description: goal.description,
            priority: goal.priority,
            status: goal.status,
            due_date: goal.due_date,
            reminder_time: goal.reminder_time,
            category: goal.category,
            user_id: goal.user_id
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