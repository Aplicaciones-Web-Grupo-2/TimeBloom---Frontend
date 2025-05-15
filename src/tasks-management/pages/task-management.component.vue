<script>
import {Task} from "../model/task.entity.js";
import {TasksApiService} from "../services/tasks-api.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import TaskCreateAndEdit from "../components/task-create-and-edit.component.vue";

export default {
  name: "task-management",
  components: {TaskCreateAndEdit, DataManager},
  data(){
    return {
      title: {singular: 'Task', plural: 'Tasks'},
      tasks: [],
      task: {},
      selectedTasks: [],
      statuses: [{label: 'Published', value: 'published'}, {label: 'Unpublished', value: 'unpublished'}],
      taskService: null,
      isVisible: false,
      isEdit: false,
      submitted: false
    }
  },
  created() {
    this.taskService = new TasksApiService();

    this.taskService.getAll().then(response => {
      console.log(response.data);
      let tasks = response.data;
      this.tasks = tasks.map((t) => Task.toDisplayableTask(t));
    });

  },
  methods: {

    notifySuccessfulAction(message){
      this.$toast.add({severity: "success", summary: "Success", detail: message, life: 3000,});
    },
    // Get the severity color according to status
    getStatusSeverity(status) {
      switch (status.toUpperCase()) {
        case 'PENDIENTE': return 'danger';
        case 'EN PROGRESO': return 'info';
        case 'COMPLETADA': return 'success';
        default: return null;
      }
    }

    ,
    findIndexById(id) {
      return this.tasks.findIndex((task) => task.id === id);
    },
    onNewItemEventHandler(){
      this.task = {};
      this.submitted = false;
      this.isEdit = false;
      this.isVisible = true;
    },

    onEditItemEventHandler(item){
      this.task = item;
      this.submitted = false;
      this.isEdit = true;
      this.isVisible = true;
    },

    onDeleteItemEventHandler(item){
      this.task = item;
      this.deleteTask();
    },

    onDeleteSelectedItemsEventHandler(selectedItems){
      this.selectedTasks = selectedItems;
      this.deleteSelectedTasks();
    },

    onCanceledEventHandler(){
      this.isVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSavedEventHandler(item){
      this.submitted = true;
      if(this.task.title.trim()){
        if(this.isEdit){
          console.log("estoy en update",item);
          console.log(this.task.title);
          this.updateTask();
        } else {
          console.log("estoy en crear",item);
          this.createTask();
        }
      }
      this.isVisible = false;
      this.isEdit = false;

    },

    createTask(){
      this.task = Task.fromDisplayableTask(this.task);
      this.task.user_id = 2;
      this.taskService.create(this.task).
          then((response) => {
            this.task = Task.toDisplayableTask(response.data);
            this.tasks.push(this.task);
            this.notifySuccessfulAction("Task Created");
      } );
    },

    updateTask(){
      this.task = Task.fromDisplayableTask(this.task);
      this.taskService.update(this.task.id,this.task).
          then((response) => {
            this.tasks[this.findIndexById(response.data.id)] = Task.toDisplayableTask(response.data);
            console.log(this.tasks[this.findIndexById(response.data.id)]);
            this.notifySuccessfulAction("Task Updated");
      });
    },

    deleteTask(){
      this.taskService.delete(this.task.id).
          then(()=>{
            this.tasks = this.tasks.filter((t)=> t.id !== this.task.id);
            this.task = {};
            this.notifySuccessfulAction("Task Deleted");
      })
    },

    deleteSelectedTasks(){
      this.selectedTasks.forEach((t) => {
        this.taskService.delete(t.id).then(()=>{
          this.tasks = this.tasks.filter((t1)=> t1.id !== t.id);
        });
      });
      this.notifySuccessfulAction("Task Deleted");
    },



  }

}
</script>

<template>

  <div class="w-full">

    <data-manager
        :title=title
         v-bind:items="tasks"
         v-on:new-item="onNewItemEventHandler"
         v-on:edit-item="onEditItemEventHandler($event)"
         v-on:delete-item="onDeleteItemEventHandler($event)"
         v-on:delete-selected-items="onDeleteSelectedItemsEventHandler($event)">
      <template #custom-columns>
        <pv-column :sortable="true" field="id"          header="Id"           style="min-width: 12rem"/>
        <pv-column :sortable="true" field="title"       header="Title"        style="min-width: 16rem"/>
        <pv-column :sortable="true" field="description" header="Description"  style="min-width: 16rem"/>
        <pv-column :sortable="true" field="priority"      header="Priority"       style="min-width: 16rem"/>
        <pv-column :sortable="true" field="category"      header="Category"       style="min-width: 16rem"/>
        <pv-column :sortable="true" field="due_date"      header="Due_date"       style="min-width: 16rem"/>
        <pv-column :sortable="true" field="status" header="Status" style="min-width: 16rem">
          <template #body="slotProps">
            <pv-tag
                :value="slotProps.data.status"
                :severity="getStatusSeverity(slotProps.data.status)"
            />
          </template>
        </pv-column>

      </template>

    </data-manager>

    <task-create-and-edit
    :statuses="statuses"
    :item="task"
    :edit="isEdit"
    :visible="isVisible"
    v-on:canceled="onCanceledEventHandler"
    v-on:task_saved="onSavedEventHandler($event)"
    />



  </div>



</template>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media screen and (max-width: 960px) {
  :deep(.p-toolbar) {
    flex-wrap: wrap;

  }
}

@media (min-width: 1024px) {
  .tutorials {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>