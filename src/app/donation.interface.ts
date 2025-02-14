export interface Donation {
    id?: number;
    token: string;
    created_at: Date;
    created_by?: number;
    description: string;
    is_redeemed: boolean;
    redeemed_at?: Date | null;
    redeemed_by__first_name?: string | null;
}

export interface DonationsResponse {
    user: string;
    total_donations: number;
    redeemed_donations?: number | null;
    donations: Donation[];
}