// src/daily-missions/model/daily-mission.entity.js

export class DailyMission {
    constructor(id = 0, content = '', date = null, completed = false, completedAt = null) {
        this.id = id;
        this.content = content;
        this.date = date || new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        this.completed = completed;
        this.completedAt = completedAt;
    }

    static fromApiResponse(data) {
        return new DailyMission(
            data.id,
            data.content,
            data.date,
            data.completed,
            data.completedAt
        );
    }

    toApiRequest() {
        return {
            id: this.id,
            content: this.content,
            date: this.date,
            completed: this.completed,
            completedAt: this.completedAt
        };
    }

    markAsCompleted() {
        this.completed = true;
        this.completedAt = new Date().toISOString();
    }

    isToday() {
        const today = new Date().toISOString().split('T')[0];
        return this.date === today;
    }
}