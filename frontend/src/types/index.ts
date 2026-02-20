export interface User {
    id: number;
    username: string;
    email: string;
}

export interface UserProfile {
    id: number;
    user: User;
    avatar: string;
    goal: string;
    xp: number;
}

export interface Scenario {
    id: number;
    name: string;
    name_display: string;
    description: string;
    // UI-only properties that we might add after fetching
    subtitle?: string;
    image?: string;
    color?: string;
    tags?: string[];
    difficulty?: string;
}

export interface QuizOption {
    id: number;
    option_text: string;
    is_correct: boolean;
}

export interface QuizQuestion {
    id: number;
    scenario: number;
    scenario_name: string;
    question_text: string;
    xp_reward: number;
    options: QuizOption[];
}

export interface UserScenarioProgress {
    id: number;
    user: number;
    scenario: number;
    scenario_details: Scenario;
    status: 'UNSOLVED' | 'IN_PROGRESS' | 'SOLVED';
}
