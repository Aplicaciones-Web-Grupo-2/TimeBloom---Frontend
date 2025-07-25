import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'
import './style.css'
import App from './app.vue'
import {
    Button, Drawer, Card, Checkbox,
    Column,
    ConfirmationService,
    ConfirmDialog,
    DataTable, Dialog,
    DialogService, FileUpload, FloatLabel, IconField, InputIcon, InputNumber, InputText, Menu, Rating,
    Row, Select, Tag, Textarea, Toast,
    ToastService, Toolbar, StyleClass, Ripple
} from "primevue";
import router from "./router/index.js";
import Dropdown from "primevue/dropdown";

createApp(App)
    .use(PrimeVue, {
        ripple: true,
        theme: {
            preset: Aura
        }
    })
    .use(router)
    .use(ToastService)
    .use(DialogService)
    .use(ConfirmationService)
    .component('pv-button', Button)
    .component('pv-drawer', Drawer)
    .component('pv-data-table', DataTable)
    .component('pv-column', Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-row', Row)
    .component('pv-toolbar', Toolbar)
    .component('pv-input-text', InputText)
    .component('pv-textarea', Textarea)
    .component('pv-menu', Menu)
    .component('pv-dialog', Dialog)
    .component('pv-toast', Toast)
    .component('pv-tag', Tag)
    .component('pv-card', Card)
    .component('pv-file-upload', FileUpload)
    .component('pv-icon-field', IconField)
    .component('pv-input-icon', InputIcon)
    .component('pv-input-number', InputNumber)
    .component('pv-float-label', FloatLabel)
    .component('pv-checkbox', Checkbox)
    .component('pv-rating', Rating)
    .component('pv-select',Select)
    .component('pv-dropdown', Dropdown)
    .directive('styleclass', StyleClass)
    .directive('ripple', Ripple)
    .mount('#app')
