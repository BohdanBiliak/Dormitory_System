export interface ManagerCreationData {
    email: string;
    name: string;
    middleName?: string;
    secondName: string;
    password: string;
    repeatPassword: string;
    dormitoryId: string;
}

export interface ManagerEditionData {
    displayName?: string;
    secondName?: string;
    email?: string;
    dormitoryId?: string;
}

export interface ManagerResetPassword {
    password: string;
    confirmPassword: string;
}