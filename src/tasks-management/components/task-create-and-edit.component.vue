<script>
export default {
  name: "task-create-and-edit",
  props:{
    item: null,
    visible: Boolean,
    statuses: Array
  },
  data(){
    return{
      submitted: false
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
        this.$emit('saved', this.item);
      }
    }

  }
}
</script>

<template>

</template>

<style scoped>

</style>