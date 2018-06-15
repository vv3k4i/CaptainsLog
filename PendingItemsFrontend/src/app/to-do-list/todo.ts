

export interface IToDo {
    Id: number;
    IsComplete: boolean;
    Comment: string; 
}

export class ToDo implements IToDo {
    Id: number;
    IsComplete: boolean;
    Comment: string; 
}