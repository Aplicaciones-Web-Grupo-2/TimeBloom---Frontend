export class Goal {
    constructor({id='', title='', category='', status='', priority=''}) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.status = status;
        this.priority = priority;
    }
}