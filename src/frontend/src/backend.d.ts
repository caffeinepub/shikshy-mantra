import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StudentSignup {
    id: bigint;
    createdBy: Principal;
    fullName: string;
    courseOfInterest: string;
    email: string;
    phoneNumber: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllSignups(): Promise<Array<StudentSignup>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMySignups(): Promise<Array<StudentSignup>>;
    getSignupById(id: bigint): Promise<StudentSignup | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    signup(fullName: string, phoneNumber: string, email: string, courseOfInterest: string): Promise<bigint>;
}
