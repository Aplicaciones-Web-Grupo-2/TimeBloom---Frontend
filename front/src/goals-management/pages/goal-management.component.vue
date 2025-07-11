<script>
import {Goal} from "../model/goal.entity.js";
import {GoalApiService} from "../services/goal-api.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import GoalItemCreateAndEditDialog from "../components/goal-item-create-and-edit.component.vue";

export default {
  name: "goal-management",
  components: {GoalItemCreateAndEditDialog, DataManager},
  data() {
    return {
      title: {singular: 'Goal', plural: 'Goals'},
      goals: [],
      goal: {},
      selectedGoals: [],
      goalService: null,
      isVisible: false,
      isEdit: false,
      submitted: false
    }
  },
  created() {
    console.log('Componente goal-management montado');
    this.goalService = new GoalApiService();
    this.goalService.getAll().then(response => {
      let goals = response.data;
      // Convierte a un array plano si es Proxy/reactivo
      const plainGoals = Array.isArray(goals) ? goals.map(g => ({ ...g })) : [];
      this.goals = plainGoals.map((g) => Goal.toDisplayableGoal ? Goal.toDisplayableGoal(g) : g);
      console.log('GOALS CARGADAS:', JSON.parse(JSON.stringify(this.goals))); // Depuración legible
    });
  },
  methods: {
    notifySuccessfulAction(message){
      this.$toast.add({severity: "success", summary: "Success", detail: message, life: 3000,});
    },
    findIndexById(id) {
      return this.goals.findIndex((goal) => goal.id === id);
    },
    onNewItemEventHandler(){
      this.goal = {};
      this.submitted = false;
      this.isEdit = false;
      this.isVisible = true;
    },
    onEditItemEventHandler(item){
      this.goal = { ...item };
      this.submitted = false;
      this.isEdit = true;
      this.isVisible = true;
    },
    onDeleteItemEventHandler(item){
      this.goal = item;
      this.deleteGoal();
    },
    onDeleteSelectedItemsEventHandler(selectedItems){
      this.selectedGoals = selectedItems;
      this.deleteSelectedGoals();
    },
    onCanceledEventHandler(){
      this.isVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSavedEventHandler(item){
      this.submitted = true;
      if(this.goal.title && this.goal.title.trim()){
        if(this.isEdit){
          this.updateGoal();
        } else {
          this.createGoal();
        }
      }
      this.isVisible = false;
      this.isEdit = false;
    },
    createGoal(){
      this.goal = Goal.fromDisplayableGoal ? Goal.fromDisplayableGoal(this.goal) : this.goal;
      this.goalService.create(this.goal).
          then((response) => {
            this.goal = Goal.toDisplayableGoal ? Goal.toDisplayableGoal(response.data) : response.data;
            this.goals.push(this.goal);
            this.notifySuccessfulAction("Goal Created");
      } );
    },
    updateGoal(){
      this.goal = Goal.fromDisplayableGoal ? Goal.fromDisplayableGoal(this.goal) : this.goal;
      this.goalService.update(this.goal.id,this.goal).
          then((response) => {
            this.goals[this.findIndexById(response.data.id)] = Goal.toDisplayableGoal ? Goal.toDisplayableGoal(response.data) : response.data;
            this.notifySuccessfulAction("Goal Updated");
      });
    },
    deleteGoal(){
      this.goalService.delete(this.goal.id).
          then(()=>{
            this.goals = this.goals.filter((g)=> g.id !== this.goal.id);
            this.goal = {};
            this.notifySuccessfulAction("Goal Deleted");
      })
    },
    deleteSelectedGoals(){
      this.selectedGoals.forEach((g) => {
        this.goalService.delete(g.id).then(()=>{
          this.goals = this.goals.filter((g1)=> g1.id !== g.id);
        });
      });
      this.notifySuccessfulAction("Goal Deleted");
    },
  }
}
</script>

<template>
  <div>
    <h2 class="goals-title">Gestión de Metas</h2>
    <data-manager
      :items="goals"
      :selected-items.sync="selectedGoals"
      :title="title"
      @edit-item="onEditItemEventHandler"
      @delete-item="onDeleteItemEventHandler"
      @delete-selected-items="onDeleteSelectedItemsEventHandler"
      @new-item="onNewItemEventHandler"
    />
    <goal-item-create-and-edit-dialog
      :visible="isVisible"
      :item="goal"
      @saved="onSavedEventHandler"
      @canceled="onCanceledEventHandler"
    />
  </div>
</template>

<style scoped>
.goals-title {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 2.2rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
}
</style>
