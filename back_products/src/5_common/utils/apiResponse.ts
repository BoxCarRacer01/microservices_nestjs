import { ApiProperty } from "@nestjs/swagger";

class RequestResponse<T> {
    @ApiProperty({ description: 'Timestamp of the response', example: 'YYYY-mm-DD' })
    timeStamp: Date;
    @ApiProperty({ description: 'Message', example: '' })
    message?: string;
    @ApiProperty({ description: 'state', example: 'true/false' })
    success: boolean;
    @ApiProperty({ description: 'Object data', example: '{...}' })
    data?: T;
    constructor(message: string, sucess?: any, data?: T) {
        this.message = message;
        this.timeStamp = new Date();
        this.success = sucess == null ? false : sucess;
        this.data = data;
    }
}

export default RequestResponse;
