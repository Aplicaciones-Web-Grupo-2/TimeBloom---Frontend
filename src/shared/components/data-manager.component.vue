<script>


import { FilterMatchMode } from '@primevue/core/api';
export default {
  name: "data-manager",
  inheritAttrs: false,
  props: {
    items: {type: Array, required: true},
    title:  {type: { singular: '', plural: ''}, required: true},
    dynamic: {type: Boolean, default: false},
    columns: {type: Array, default: () => []},
  },
  data(){
    return{
      selectedItems: [],
      filters: null
    }
  },
  created(){
    this.initFilters();
  },
  methods: {
    initFilters() {
      this.filters = {global: {value: null, matchMode: FilterMatchMode.CONTAINS}};
    },
    newItem() {
      this.$emit('new-item');
    },
    confirmDeleteSelected() {
      this.$confirm.require({
        message:      `Are you sure you want to delete the selected ${this.title.plural}?`,
        header:       'Confirmation',
        icon:         'pi pi-exclamation-triangle',
        rejectClass:  'p-button-secondary p-button-outlined',
        rejectLabel:  'Cancel',
        acceptLabel:  'Delete',
        acceptClass:  'p-button-danger',
        accept:       () => this.$emit('delete-selected-items', this.selectedItems),
        reject:       () => {}
      });
    },
    exportToCsv() {
      // Exporta solo los campos relevantes de las metas
      const table = this.$refs.dt;
      if (table && table.exportCSV) {
        table.exportCSV({
          selectionOnly: false
        });
      } else {
        // Fallback manual: solo los campos relevantes
        const items = this.items || [];
        if (!items.length) return;
        // Define los campos que quieres exportar
        const keys = ["title", "description", "category", "status", "priority"];
        const csvRows = [keys.join(",")];
        for (const item of items) {
          csvRows.push(keys.map(k => '"' + (item[k] ?? '') + '"').join(","));
        }
        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.title.plural || 'export'}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }
    },
    editItem(item) {
      this.$emit('edit-item', item);
    },
    confirmDeleteItem(item) {
      this.$confirm.require({
        message:      `Are you sure you want to delete this ${this.title.singular}?`,
        header:       'Confirmation',
        icon:         'pi pi-exclamation-triangle',
        rejectClass:  'p-button-secondary p-button-outlined',
        rejectLabel:  'Cancel',
        acceptLabel:  'Delete',
        acceptClass:  'p-button-danger',
        accept:       () => this.$emit('delete-item', item),
        reject:       () => {}
      });
    },
    goalRowClass(goal) {
      return '';
    },
  },
}
</script>

<template>
  <div class="goals-table-wrapper">
    <pv-toast/>
    <pv-confirm-dialog/>
    <h3>Manage {{ title.plural }}</h3>
    <!-- Toolbar Section -->
    <pv-toolbar class="mb-4">
      <template #start>
        <pv-button class="mr-2" icon="pi pi-plus" label="New" severity="success" @click="newItem"/>
        <pv-button :disabled="!selectedItems || !selectedItems.length" icon="pi pi-trash" label="Delete" severity="danger"
                   @click="confirmDeleteSelected"/>
      </template>
      <template #end>
        <pv-button icon="pi pi-download" label="Export" severity="help" @click="exportToCsv($event)"/>
      </template>
    </pv-toolbar>

    <!-- Data Table Section -->
    <pv-data-table
        ref="dt"
        v-model:selection="selectedItems"
        :filters="filters"
        :paginator="true"
        :rows="10"
        :rows-per-page-options="[5, 10, 20]"
        :value="items"
        current-page-report-template="Showing {first} to {last} of {totalRecords} ${{title.plural}}"
        data-key="id"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowClass="goalRowClass"
      >
      <pv-column field="title" header="Título" />
      <pv-column field="description" header="Descripción" />
      <pv-column field="category" header="Categoría" />
      <pv-column field="status" header="Estado" />
      <pv-column field="priority" header="Prioridad" />
      <pv-column :exportable="false" selectionMode="multiple" style="width: 3rem"/>
      <slot name="custom-columns"></slot>
      <pv-column v-if="dynamic" v-for="column in columns" :key="column.field" :field="column.field" :header="column.header"/>
      <pv-column :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <pv-button icon="pi pi-pencil" outlined rounded class="mr-2 " @click="editItem(slotProps.data)"/>
          <pv-button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteItem(slotProps.data)"/>
        </template>
      </pv-column>
    </pv-data-table>
  </div>
</template>

<style scoped>
.goals-table-wrapper {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2rem 2rem 2rem 2rem;
  background: #181818;
  border-radius: 1.2rem;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.07);
}
/* Se elimina el resaltado especial, todas las filas tendrán el color por defecto del tema */
</style>