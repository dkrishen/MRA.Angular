export class Order {
    id: string;
    meetingRoomId: string;
    meetingRoomName: string;
    username: string;
    userId: string;
    startTime: number; //Date;
    endTime: number; //Date;

    constructor(){
        this.id = "";
        this.meetingRoomName = "";
        this.meetingRoomId = "";
        this.username = "";
        this.userId = "";
        this.startTime = Date.now();
        this.endTime = Date.now();
    }
}