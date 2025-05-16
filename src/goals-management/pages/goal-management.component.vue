<script>
import DataManager from '../../shared/components/data-manager.component.vue';
import GoalItemCreateAndEditDialog from '../components/goal-item-create-and-edit.component.vue';
import {Goal} from '../model/goal.entity.js';
import {GoalService} from '../services/goal.service.js';

export default {
  name: "goal-management",
  components: {DataManager, GoalItemCreateAndEditDialog},
  data() {
    return {
      title: {singular: 'goal', plural: 'goals'},
      goals: [],
      goal: new Goal({}),
      selectedGoals: [],
      goalService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
    }
  },
  methods: {
    onNewItem() {
      this.goal = new Goal({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
      console.log("Se aperturo del Dialog Create");
    },
    onEditItem(item)
    {
      this.goal = new Goal(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onDeleteItem(item)
    {
      console.log("onDeleteItem");

      this.goal = {...item};
      console.log(this.goal);
      this.deleteGoal();
    },
    deleteGoal() {
      console.log("delete goal");
      this.goalService.delete(this.goal.id).then(() => {
        console.log("antes de buscando el index");

        let index = this.findIndexById(this.goal.id);
        console.log("buscando el index");
        this.goals.splice(index, 1);
        this.notifySuccessfulAction("Goal Deleted");

      }).catch(error => console.error(error));
    },
    onDeleteSelectedItems(selectedItems)
    {
      console.log("onDeleteSelectedItems");
      this.selectedGoals = selectedItems;
      this.deleteSelectedGoals();
    },
    deleteSelectedGoals()
    {
      this.selectedGoals.forEach((goal) => {
        this.goalService.delete(goal.id).then(() => {
          this.goals = this.goals.filter((t) => t.id !== this.goal.id);
        });
      });
      this.notifySuccessfulAction("Goals Deleted");
    },
    onCancelRequested()
    {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item)
    {
      console.log("onSaveRequested todo casi bien");
      this.submitted = true;
      console.log(" onSaveRequested antes del if");
      if (this.goal.name.trim()) {
        console.log(" onSaveRequested antes del segundo if");
        //  console.log(item);
        if (item.id)
        { console.log("En el update");
          this.updateGoal();
        }
        else
        {
          console.log("En el create");
          this.createGoal();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },
    findIndexById(id) {
      return this.goals.findIndex( goal => goal.id === id);
    },
    createGoal() {
      this.goalService.create(this.goal).then(response =>{
            let goal = new Goal(response.data)
            console.log(goal);
            this.goals.push(goal);
            this.notifySuccessfulAction("Goal Created");
          }
      ).catch(error => console.error(error));

    },
    notifySuccessfulAction(message){
      this.$toast.add({severity:'success', summary: 'Success', detail: message, life: 3000});
    },
    updateGoal() {
      this.goalService.update(this.goal.id, this.goal).then( response =>{
        let index = this.findIndexById(this.goal.id);
        this.goals[index] = new Goal(response.data);
        this.notifySuccessfulAction("Goal Updated");
      }).catch(error => console.error(error));
    }
  },
  created() {
    this.goalService = new GoalService();
    this.goalService.getAll().then(response => {
      this.goals = response.data.map(goal => new Goal(goal));
      console.log(this.goals);
    }).catch(error => console.error(error));
    console.log("obtuvo las metas");
    console.log(this.goals);
  },
}
</script>
<template>
  <div class="w-full">
    <data-manager :title=title
                  :items="goals"
                  @new-item-requested="onNewItem"
                  @edit-item-requested="onEditItem($event)"
                  @delete-item-requested="onDeleteItem($event)"
                  @delete-selected-items-requested="onDeleteSelectedItems($event)">
      <template #custom-columns>
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="title" header="Title" style="min-width: 24rem"/>
        <pv-column :sortable="true" field="category" header="Category" style="min-width: 24rem"/>
        <pv-column :sortable="true" field="status" header="Status" style="min-width: 24rem"/>
        <pv-column :sortable="true" field="priority" header="Priority" style="min-width: 24rem"/>
      </template>
    </data-manager>

    <goal-item-create-and-edit-dialog
        :edit="isEdit"
        :item="goal"
        :visible="createAndEditDialogIsVisible"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested($event)">

    </goal-item-create-and-edit-dialog>

  </div>

</template>