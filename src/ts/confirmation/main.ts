import { confirmationData } from "../env";

export function showConfirmation(data:Confirmation) {
    confirmationData.set([true,data]);
}

export function hideConfirmation() {
    confirmationData.set([false,null]);
}

export interface Confirmation {
    title:string;
    message?:string;
    okButton:ConfirmationButton;
    cancelButton:ConfirmationButton;
}

export interface ConfirmationButton {
    capt:string;
    icon?:string;
    className?:string;
    event: () => void;
}