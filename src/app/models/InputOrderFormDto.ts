export class InputOrderFormDto {
    username?: string;
    startTime?: string; //Date;
    endTime?: string; //Date;
    date?: string;

    constructor(){
        this.username = "";
        this.startTime = "";
        this.endTime = "";
        this.date = "";
    }
}