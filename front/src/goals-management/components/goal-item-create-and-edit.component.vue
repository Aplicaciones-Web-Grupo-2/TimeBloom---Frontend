<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "goal-item-create-and-edit",
  components: { CreateAndEdit },
  props: {
    item: null,
    visible: Boolean
  },
  data() {
    return {
      submitted: false,
      priorities: [
        { label: 'Alta', value: 'ALTA' },
        { label: 'Media', value: 'MEDIA' },
        { label: 'Baja', value: 'BAJA' }
      ],
      categories: [
        { label: 'Estudio', value: 'ESTUDIO' },
        { label: 'Tareas Domésticas', value: 'TAREAS DOMESTICAS' },
        { label: 'Otros', value: 'OTROS' }
      ]
    }
  },
  emits: ['save-requested', 'cancel-requested'],
  methods: {
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
      if (this.item && this.item.title) {
        this.$emit('save-requested', this.item);
      }
    }
  }
}
</script>
<template>
  <create-and-edit :entity="item" :visible="visible" entity-name="Goal"
                   @saved="onSaveRequested"
                   @canceled="onCancelRequested">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="title">Título</label>
            <pv-input-text id="title" v-model="item.title" :class="{ 'p-invalid': submitted && !item.title }" />
          </pv-float-label>
          <pv-float-label>
            <label for="description">Descripción</label>
            <pv-input-text id="description" v-model="item.description" />
          </pv-float-label>
          <pv-float-label>
            <label for="category">Categoría</label>
            <pv-dropdown id="category" v-model="item.category" :options="categories" option-label="label" option-value="value" :class="{ 'p-invalid': submitted && !item.category }" />
          </pv-float-label>
          <pv-float-label>
            <label for="status">Estado</label>
            <pv-input-text id="status" v-model="item.status" :class="{ 'p-invalid': submitted && !item.status }" />
          </pv-float-label>
          <pv-float-label>
            <label for="priority">Prioridad</label>
            <pv-dropdown id="priority" v-model="item.priority" :options="priorities" option-label="label" option-value="value" :class="{ 'p-invalid': submitted && !item.priority }" />
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>
<style scoped></style>