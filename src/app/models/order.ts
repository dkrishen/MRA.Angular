import { Guid } from 'guid-typescript';

export class Order {
    id: Guid;
    meetingRoomId: Guid;
    meetingRoomName: string;
    username: string;
    userId: Guid;
    date: number; //Date
    startTime: string; //Date;
    endTime: string; //Date;

    constructor(){
        this.id = Guid.create();
        this.meetingRoomName = "";
        this.meetingRoomId =  Guid.create();
        this.username = "";
        this.userId =  Guid.create();
        this.date = Date.now();
        this.startTime = "";
        this.endTime = "";
    }
}