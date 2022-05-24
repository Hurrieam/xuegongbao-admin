declare namespace API {
    type Response = {
        code: number;
        data?: any;
        message?: string;
        description?: string;
    }

    type DetailModalProps = {
        visible: boolean;
        data?: any;
        callback?: (e) => void;
        hidden: () => void;
    }

    type LoginForm = {
        username: string;
        password: string;
    }

    type  Comment = {
        id?: number;
        openid?: string;
        parentId?: string;
        content: string;
        createdAt?: any;
        hasReply?: boolean;
    }

    type LostAndFound = {
        id: number;
        itemName: string;
        location?: string;
        lostTime?: string;
        description: string;
        images?: string;
        stuName?: string;
        contact: string;
        status?: boolean;
    }

    type PhoneBook = {
        id?: number;
        deptName: string;
        phone: string;
    }

    type  RepairItem = {
        id: number;
        itemName: string;
        description?: string;
        dorm: string;
        room: string;
        stuName?: string;
        contact: string;
        time: string;
        createdAt: string;
        status: boolean;
    }

    type Reservation = {
        id: number;
        type: string;
        stuName: string;
        sdept: string;
        content: string;
        time: string;
        contact: string;
        status: boolean;
    }

    type EvalItem = {
        id: number;
        canteenName: string;
        content: string;
        totalScore: number;
        mainProblem: string;
        createdAt: string;
    }
}