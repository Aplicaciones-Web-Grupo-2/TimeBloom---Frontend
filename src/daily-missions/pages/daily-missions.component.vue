<!-- src/daily-missions/pages/daily-missions.component.vue -->

<template>
  <div class="daily-missions-container">
    <!-- Header -->
    <div class="page-header">
      <h1 class="page-title">
        <i class="pi pi-star"></i>
        Misión del Día
      </h1>
      <p class="page-subtitle">
        Cada día un nuevo desafío para mejorar tu productividad
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <pv-progress-spinner></pv-progress-spinner>
      <p>Cargando tu misión del día...</p>
    </div>

    <!-- Today's Mission -->
    <div v-else-if="todayMission" class="today-mission-section">
      <h2 class="section-title">
        <i class="pi pi-calendar"></i>
        Misión de Hoy
      </h2>

      <DailyMissionCard
          :mission="todayMission"
          :completing="completing"
          @complete="handleCompleteMission"
      />
    </div>

    <!-- Congratulations Dialog -->
    <pv-dialog
        v-model:visible="showCongratulations"
        header="¡Felicitaciones!"
        :modal="true"
        :closable="true"
        class="congratulations-dialog"
    >
      <div class="congratulations-content">
        <div class="congratulations-icon">
          <i class="pi pi-trophy"></i>
        </div>
        <h3>¡Has completado tu misión del día!</h3>
        <p>Excelente trabajo. Cada pequeño paso cuenta hacia tus objetivos.</p>
        <div class="celebration-emojis">
          🎉 🌟 🚀 💪 ✨
        </div>
      </div>
      <template #footer>
        <pv-button
            label="¡Genial!"
            icon="pi pi-check"
            severity="success"
            @click="showCongratulations = false"
            class="celebration-button"
        />
      </template>
    </pv-dialog>

    <!-- Previous Missions -->
    <div v-if="previousMissions.length > 0" class="previous-missions-section">
      <h2 class="section-title">
        <i class="pi pi-history"></i>
        Misiones Anteriores
      </h2>

      <div class="previous-missions-grid">
        <div
            v-for="mission in previousMissions"
            :key="mission.id"
            class="previous-mission-item"
            :class="{ 'completed': mission.completed }"
        >
          <div class="mission-status">
            <i class="pi pi-check-circle" v-if="mission.completed"></i>
            <i class="pi pi-times-circle" v-else></i>
          </div>
          <div class="mission-details">
            <p class="mission-content">{{ mission.content }}</p>
            <small class="mission-date">{{ formatDate(mission.date) }}</small>
          </div>
        </div>
      </div>

      <div v-if="previousMissions.length >= 10" class="load-more-section">
        <pv-button
            label="Ver más misiones"
            icon="pi pi-angle-down"
            severity="secondary"
            outlined
            @click="loadMoreMissions"
            :loading="loadingMore"
        />
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading" class="empty-state">
      <div class="empty-icon">
        <i class="pi pi-info-circle"></i>
      </div>
      <h3>No hay misiones anteriores</h3>
      <p>¡Empieza completando tu primera misión del día!</p>
    </div>
  </div>
</template>

<script>
import { DailyMissionService } from '../services/daily-mission.service.js';
import DailyMissionCard from '../components/daily-mission-card.component.vue';
import ProgressSpinner from 'primevue/progressspinner';

export default {
  name: 'DailyMissions',
  components: {
    DailyMissionCard,
    'pv-progress-spinner': ProgressSpinner
  },
  data() {
    return {
      todayMission: null,
      previousMissions: [],
      loading: true,
      completing: false,
      loadingMore: false,
      showCongratulations: false,
      dailyMissionService: new DailyMissionService(),
      previousMissionsLimit: 10
    };
  },
  async mounted() {
    await this.loadTodayMission();
    await this.loadPreviousMissions();
  },
  methods: {
    async loadTodayMission() {
      try {
        this.loading = true;
        this.todayMission = await this.dailyMissionService.getTodayMission();
      } catch (error) {
        console.error('Error loading today mission:', error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la misión del día',
          life: 3000
        });
      } finally {
        this.loading = false;
      }
    },

    async loadPreviousMissions() {
      try {
        this.previousMissions = await this.dailyMissionService.getPreviousMissions(this.previousMissionsLimit);
      } catch (error) {
        console.error('Error loading previous missions:', error);
      }
    },

    async loadMoreMissions() {
      try {
        this.loadingMore = true;
        this.previousMissionsLimit += 10;
        this.previousMissions = await this.dailyMissionService.getPreviousMissions(this.previousMissionsLimit);
      } catch (error) {
        console.error('Error loading more missions:', error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar más misiones',
          life: 3000
        });
      } finally {
        this.loadingMore = false;
      }
    },

    async handleCompleteMission(missionId) {
      try {
        this.completing = true;
        await this.dailyMissionService.completeMission(missionId);

        // Update today's mission
        this.todayMission.markAsCompleted();

        // Show congratulations
        this.showCongratulations = true;

        // Reload previous missions to include the completed one
        await this.loadPreviousMissions();

        this.$toast.add({
          severity: 'success',
          summary: '¡Felicitaciones!',
          detail: 'Has completado tu misión del día',
          life: 3000
        });
      } catch (error) {
        console.error('Error completing mission:', error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo completar la misión',
          life: 3000
        });
      } finally {
        this.completing = false;
      }
    },

    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
};
</script>

<style scoped>
.daily-missions-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.page-title i {
  color: #f39c12;
  font-size: 2.5rem;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin: 0;
}

.loading-container {
  text-align: center;
  padding: 3rem;
}

.loading-container p {
  margin-top: 1rem;
  color: #7f8c8d;
  font-size: 1.1rem;
}

.today-mission-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title i {
  color: #3498db;
  font-size:  1.5rem;
}

.congratulations-dialog .congratulations-content {
  text-align: center;
  padding: 2rem;
}

.congratulations-icon {
  font-size: 4rem;
  color: #f39c12;
  margin-bottom: 1rem;
}

.congratulations-content h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.congratulations-content p {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.celebration-emojis {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.celebration-button {
  background: #27ae60 !important;
  border: none !important;
  padding: 1rem 2rem !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
}

.previous-missions-section {
  margin-top: 3rem;
}

.previous-missions-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.previous-mission-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-left: 4px solid #e74c3c;
}

.previous-mission-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.previous-mission-item.completed {
  border-left-color: #27ae60;
  background: #f8fff8;
}

.mission-status {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.mission-status .pi-check-circle {
  color: #27ae60;
}

.mission-status .pi-times-circle {
  color: #e74c3c;
}

.mission-details {
  flex: 1;
}

.mission-content {
  font-size: 1.1rem;
  font-weight: 500;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.mission-date {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.load-more-section {
  text-align: center;
  margin-top: 2rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #bdc3c7;
}

.empty-state h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .daily-missions-container {
    padding: 0.5rem;
  }

  .page-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .previous-mission-item {
    padding: 1rem;
  }

  .mission-content {
    font-size: 1rem;
  }
}
</style>