export class Order {
    id: string;
    meetingRoomId: string;
    meetingRoomName: string;
    username: string;
    userId: string;
    date: number; //Date
    startTime: string; //Date;
    endTime: string; //Date;

    constructor(){
        this.id = "";
        this.meetingRoomName = "";
        this.meetingRoomId = "";
        this.username = "";
        this.userId = "";
        this.date = Date.now();
        this.startTime = "";
        this.endTime = "";
    }
}