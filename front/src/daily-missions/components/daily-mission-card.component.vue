<!-- src/daily-missions/components/daily-mission-card.component.vue -->

<template>
  <div class="mission-card">
    <div class="mission-content" :class="{ 'completed': mission?.completed }">
      <div class="mission-icon">
        <i class="pi pi-star" v-if="!mission?.completed"></i>
        <i class="pi pi-check-circle" v-else></i>
      </div>
      <div class="mission-text">
        {{ mission?.content || 'Cargando misión del día...' }}
      </div>
      <div class="mission-date">
        {{ formatDate(mission?.date) }}
      </div>
    </div>

    <div class="mission-actions" v-if="mission && !mission.completed && mission.isToday && mission.isToday()">
      <pv-button
          class="complete-button"
          label="Completar Misión"
          icon="pi pi-check"
          severity="success"
          @click="completeMission"
          :loading="completing"
      />
    </div>

    <div class="completion-badge" v-if="mission?.completed">
      <i class="pi pi-trophy"></i>
      <span>¡Completada!</span>
      <small v-if="mission.completedAt">{{ formatCompletedDate(mission.completedAt) }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DailyMissionCard',
  props: {
    mission: {
      type: Object,
      default: null
    },
    completing: {
      type: Boolean,
      default: false
    }
  },
  emits: ['complete'],
  methods: {
    completeMission() {
      this.$emit('complete', this.mission.id);
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (dateString === today.toISOString().split('T')[0]) {
        return 'Hoy';
      } else if (dateString === yesterday.toISOString().split('T')[0]) {
        return 'Ayer';
      } else {
        return date.toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    },
    formatCompletedDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
}
</script>

<style scoped>
.mission-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2rem;
  margin: 1rem 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.mission-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.mission-card.completed {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
}

.mission-content {
  color: white;
  text-align: center;
  position: relative;
  z-index: 2;
}

.mission-content.completed .mission-text {
  text-decoration: line-through;
  opacity: 0.8;
}

.mission-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #FFD700;
}

.mission-text {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.mission-date {
  font-size: 1rem;
  opacity: 0.9;
  font-weight: 500;
}

.mission-actions {
  margin-top: 1.5rem;
  text-align: center;
}

.complete-button {
  background: #4CAF50 !important;
  border: none !important;
  padding: 1rem 2rem !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  border-radius: 50px !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3) !important;
}

.complete-button:hover {
  background: #45a049 !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4) !important;
}

.completion-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 600;
  flex-direction: column;
  text-align: center;
}

.completion-badge i {
  color: #FFD700;
  font-size: 1.2rem;
}

.completion-badge small {
  font-size: 0.8rem;
  opacity: 0.8;
}

/* Efecto de brillo animado */
.mission-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
  );
  transition: left 0.5s;
}

.mission-card:hover::before {
  left: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .mission-card {
    padding: 1.5rem;
    margin: 0.5rem 0;
  }

  .mission-text {
    font-size: 1.2rem;
  }

  .mission-icon {
    font-size: 2.5rem;
  }

  .complete-button {
    padding: 0.8rem 1.5rem !important;
    font-size: 1rem !important;
  }
}
</style>