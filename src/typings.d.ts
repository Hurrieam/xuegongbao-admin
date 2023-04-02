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

    type  Message = {
        id?: number;
        fingerprint?: string;
        stuId?: string;
        content: string;
        parentId?: string;
        anonymous?: boolean;
        replied?: boolean;
        isReply?: boolean;
        deleted?: boolean;
        createdAt?: string;
    }

    type LostAndFound = {
        id: number;
        fingerprint: string;
        stuId?: string;
        title: string;
        tags?: string;
        location?: string;
        date?: string;
        description: string;
        images?: string;
        contactMethod: string;
        contactNumber: string;
        type: string;
        status?: string;
        deleted?: string;
        createdAt?: string;
    }

    type PhoneBook = {
        id?: number;
        type: string;
        name: string;
        phone: string;
        deleted?: boolean;
        createdAt?: string;
    }

    type  RepairItem = {
        id: number;
        fingerprint: string;
        stuId?: string;
        itemName: string;
        description: string;
        dorm: string;
        room: string;
        contactNumber: string;
        status?: boolean;
        deleted?: string;
        createdAt?: string;
    }

    type Reservation = {
        id: number;
        fingerprint: string;
        stuId?: string;
        type: string;
        content: string;
        date: string;
        contactMethod: string;
        contactNumber: string;
        status?: boolean;
        deleted?: boolean;
        createdAt?: string;
    }

    type EvalItem = {
        id: number;
        fingerprint: string;
        stuId?: string;
        canteen: string;
        ratings: string;
        idea?: string;
        lowScoreItems: string;
        highScoreItems: string;
        totalScore: number;
        deleted?: boolean;
        createdAt?: string;
    }
}

interface User {
    id: number;
    stuClass: string;
    stuId: string;
    stuName: string;
}