import { DailyMission } from '../model/daily-mission.entity.js';

export class DailyMissionService {
    constructor() {
        this.resourceEndpoint = '/daily-missions';
        this.predefinedMissions = [
            "Hoy termina una tarea sin interrupciones",
            "Hoy no revises redes sociales antes de las 10 a.m.",
            "Hoy dedica 30 minutos a aprender algo nuevo",
            "Hoy haz una pausa de 10 minutos cada hora de trabajo",
            "Hoy organiza tu espacio de trabajo antes de empezar",
            "Hoy practica la técnica Pomodoro en al menos una tarea",
            "Hoy no uses el teléfono durante las comidas",
            "Hoy termina tu tarea más importante antes del mediodía",
            "Hoy toma al menos 5 minutos de descanso entre tareas",
            "Hoy escribe una lista de 3 cosas por las que estés agradecido",
            "Hoy dedica 15 minutos a planificar el día de mañana",
            "Hoy evita las distracciones digitales durante 2 horas seguidas"
        ];

        // Datos mock en memoria
        this.mockMissions = this.generateMockData();
    }

    // Genera datos de prueba
    generateMockData() {
        const missions = [];
        const today = new Date();

        for (let i = 0; i < 15; i++) {
            const date = new Date();
            date.setDate(today.getDate() - i);

            missions.push(new DailyMission(
                i + 1,
                this.predefinedMissions[i % this.predefinedMissions.length],
                date.toISOString().split('T')[0],
                i % 3 === 0, // 1/3 completadas
                i % 3 === 0 ? new Date().toISOString() : null
            ));
        }

        return missions;
    }

    async getAll() {
        return new Promise(resolve => {
            // Simulamos un pequeño retraso de red
            setTimeout(() => {
                resolve([...this.mockMissions]);
            }, 300);
        });
    }

    async getTodayMission() {
        const today = new Date().toISOString().split('T')[0];
        const missions = await this.getAll();
        let todayMission = missions.find(mission => mission.date === today);

        if (!todayMission) {
            todayMission = await this.generateTodayMission();
        }

        return todayMission;
    }

    async generateTodayMission() {
        const today = new Date().toISOString().split('T')[0];
        const missions = await this.getAll();

        // Filtramos misiones recientes (últimos 7 días)
        const recentMissions = missions
            .filter(mission => {
                const missionDate = new Date(mission.date);
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                return missionDate >= sevenDaysAgo;
            })
            .map(mission => mission.content);

        // Misiones disponibles
        const availableMissions = this.predefinedMissions.filter(
            mission => !recentMissions.includes(mission)
        );

        const missionPool = availableMissions.length > 0 ? availableMissions : this.predefinedMissions;
        const randomIndex = Math.floor(Math.random() * missionPool.length);

        const newId = Math.max(...this.mockMissions.map(m => m.id)) + 1;
        const newMission = new DailyMission(
            newId,
            missionPool[randomIndex],
            today,
            false,
            null
        );

        this.mockMissions.unshift(newMission);
        return newMission;
    }

    async create(dailyMission) {
        return new Promise(resolve => {
            setTimeout(() => {
                this.mockMissions.unshift(dailyMission);
                resolve(dailyMission);
            }, 200);
        });
    }

    async update(id, dailyMission) {
        return new Promise(resolve => {
            setTimeout(() => {
                const index = this.mockMissions.findIndex(m => m.id === id);
                if (index !== -1) {
                    this.mockMissions[index] = dailyMission;
                }
                resolve(dailyMission);
            }, 200);
        });
    }

    async completeMission(id) {
        const missions = await this.getAll();
        const mission = missions.find(m => m.id === id);

        if (mission && !mission.completed) {
            mission.markAsCompleted();
            return await this.update(id, mission);
        }

        return mission;
    }

    async getPreviousMissions(limit = 10) {
        const missions = await this.getAll();
        const today = new Date().toISOString().split('T')[0];

        return missions
            .filter(mission => mission.date !== today)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }
}