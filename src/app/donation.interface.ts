export interface Donation {
    id: number;
    token: string;
    created_at: Date;
    created_by: number;
    description: string;
    is_redeemed: boolean;
    redeemed_at: Date;
    redeemed_by: number;
}