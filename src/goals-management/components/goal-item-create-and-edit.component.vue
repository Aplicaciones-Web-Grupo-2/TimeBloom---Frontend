<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue"
export default {
  title: "goal-item-create-and-edit-dialog",
  components: {CreateAndEdit},
  props:
      {
        item:null,
        visible:false
      },
  data() {
    return {
      submitted: false,
    }
  },
  emits: ['save-requested', 'cancel-requested'],
  methods: {
    onSaveRequested(item) {
      console.log("onSaveRequested todo bien");
      this.submitted = true;
      this.$emit('save-requested', this.item);
    },
    onCancelRequested() {
      this.$emit('cancel-requested');
    }
  }
}
</script>
<template>
  <create-and-edit :entity="item" :visible="visible" entity-name="Goal"
                   @save-action-requested="onSaveRequested"
                   @cancel-action-requested="onCancelRequested">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="title">Title</label>
            <pv-input-text id="title" v-model="item.title" :class="{ 'p-invalid': submitted && !item.title }"></pv-input-text>
          </pv-float-label>
          <pv-float-label>
          <label for="category">Category</label>
          <pv-input-text id="category" v-model="item.category" :class="{ 'p-invalid': submitted && !item.category }"></pv-input-text>
          </pv-float-label>
          <pv-float-label>
          <label for="status">Status</label>
          <pv-input-text id="status" v-model="item.status" :class="{ 'p-invalid': submitted && !item.status }"></pv-input-text>
          </pv-float-label>
          <pv-float-label>
          <label for="priority">Priority</label>
          <pv-input-text id="priority" v-model="item.priority" :class="{ 'p-invalid': submitted && !item.priority }"></pv-input-text>
          </pv-float-label>
        </div>
      </div>
    </template>

  </create-and-edit>
</template>
<style scoped></style>