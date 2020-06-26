class Client {
    constructor(row) {
        this.row = row;
    }

    get id_message() {
        return this.row.id_message;
    }

    get contents_message() {
        return this.row.contents_message;
    }

    get creat_at() {
        return moment(this.row.creat_at);
    }
}