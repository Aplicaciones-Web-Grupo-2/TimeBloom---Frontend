<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "task-create-and-edit",
  components: {CreateAndEdit},
  props:{
    item: null,
    visible: Boolean,
    statuses: Array,
    categories:Array
  },
  data(){
    return{
      submitted: false,
      priorities: [
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' }
      ]
    }
  },
  methods:{
    getSeverity(status) {
      switch (status) {
        case 'Published':
          return 'success';
        case 'Unpublished':
          return 'info';
        default:
          return null;
      }
    },

    canceledEventHandler() {
      this.$emit('canceled');
    },
    savedEventHandler() {
      console.log(this.item);
      this.submitted = true;
      if (this.item.title) {
        this.$emit('task_saved', this.item);
      }
    }

  }
}
</script>

<template>
  <create-and-edit
      :entity="item"
      :visible="visible"
      entityName="Task"
      @canceled="canceledEventHandler"
      @saved="savedEventHandler"
  >
    <template #content>
      <div class="p-fluid">

        <!-- Title -->
        <div class="field mt-4">
          <pv-float-label>
            <label for="title">Title</label>
            <pv-input-text id="title" v-model="item.title" :class="{'p-invalid': submitted && !item.title}" />
            <small v-if="submitted && !item.title" class="p-invalid">Title is required.</small>
          </pv-float-label>
        </div>

        <!-- Description -->
        <div class="field mt-4">
          <pv-float-label>
            <label for="description">Description</label>
            <pv-textarea id="description" v-model="item.description" rows="3" />
          </pv-float-label>
        </div>

        <!-- Priority -->
        <div class="field mt-4">
          <pv-float-label>
            <label for="priority">Priority</label>
            <pv-select
                id="priority"
                v-model="item.priority"
                :options="priorities"
                optionLabel="label"
                optionValue="value"
                placeholder="Select Priority"
            />
          </pv-float-label>
        </div>

        <!-- Status -->
        <div class="field mt-4">
          <pv-float-label>
            <label for="status">Status</label>
            <pv-select
                id="status"
                v-model="item.status"
                :options="statuses"
                optionLabel="label"
                optionValue="value"
                placeholder="Select Status"
            />
          </pv-float-label>
        </div>

        <!-- Due Date -->
        <div class="field mt-4">
          <pv-float-label>
            <label for="due_date">Due Date</label>
            <pv-input-text id="due_date" v-model="item.due_date" />
            <!-- Puedes reemplazar con pv-calendar si necesitas un date picker -->
          </pv-float-label>
        </div>

        <!-- Reminder Time -->
        <div class="field mt-4">
          <pv-float-label>
            <label for="reminder_time">Reminder Time</label>
            <pv-input-text id="reminder_time" v-model="item.reminder_time" />
            <!-- Puedes reemplazar con pv-calendar con showTime si es datetime -->
          </pv-float-label>
        </div>

        <!-- Category -->
        <div class="field mt-4">
          <pv-float-label>
            <label for="category">Category</label>
            <pv-select
                id="category"
                v-model="item.taskCategoryId"
                :options="categories"
                optionLabel="label"
                optionValue="value"
                placeholder="Select Category"
            />
          </pv-float-label>
        </div>

      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>
.field {
  margin-bottom: 1.25rem;
}
</style>