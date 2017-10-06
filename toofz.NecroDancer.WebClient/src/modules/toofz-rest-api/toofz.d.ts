declare namespace toofz {
    interface PagedResults {
        total: number;
    }

    interface Item {
        name: string;
        display_name: string;
        slot: string | null;
        unlock: number | null;
        cost: number | null;
    }

    interface Items {
        total: number;
        items: Item[];
    }

    interface Enemy {
        name: string;
        type: number;
        display_name: string;
        health: number;
        damage: number;
        beats_per_move: number;
        drops: number;
    }

    interface Enemies {
        total: number;
        enemies: Enemy[];
    }

    interface Entry extends EntryBase<Leaderboard> {}

    interface Leaderboard extends LeaderboardBase {
        mode: Modes;
        _mode: Mode;
        run: Runs;
        _run: Run;
        character: Characters;
        _character: Character;
    }

    interface Leaderboards {
        total: number;
        leaderboards: Leaderboard[];
    }

    interface LeaderboardEntries {
        leaderboard: Leaderboard;
        total: number;
        entries: Entry[];
    }

    interface DailyEntry extends EntryBase<DailyLeaderboard> {}

    interface DailyLeaderboard extends LeaderboardBase {
        date: string;
    }

    interface DailyLeaderboards {
        total: number;
        leaderboards: DailyLeaderboard[];
    }

    interface DailyLeaderboardEntries {
        leaderboard: DailyLeaderboard;
        total: number;
        entries: DailyEntry[];
    }

    interface EntryBase<TLeaderboard extends LeaderboardBase> {
        leaderboard?: TLeaderboard;
        player?: Player;
        rank: number;
        score: number;
        end: End;
        killed_by: string | null;
        version: number | null;
    }

    interface LeaderboardBase {
        id: number;
        updated_at: string;
        display_name: string;
        production: boolean;
        product: Products;
        _product: Product;
        total: number;
    }

    interface Product {
        id: number;
        name: Products;
        display_name: string;
    }

    interface Mode {
        id: number;
        name: Modes;
        display_name: string;
    }

    interface Run {
        id: number;
        name: Runs;
        display_name: string;
    }

    interface Character {
        id: number;
        name: Characters;
        display_name: string;
    }

    interface End {
        zone: number;
        level: number;
    }

    interface Player {
        id: string;
        display_name: string | null;
        updated_at: string | null;
        avatar: string | null;
    }

    interface Players {
        total: number;
        players: Player[];
    }

    interface PlayerEntries extends PlayerEntriesBase<Entry> {}

    interface PlayerDailyEntries extends PlayerEntriesBase<DailyEntry> {}

    interface PlayerEntriesBase<TEntry extends EntryBase<LeaderboardBase>> {
        player: Player;
        total: number;
        entries: TEntry[];
    }

    interface PaginationParams {
        offset?: number;
        limit?: number;
    }

    interface GetLeaderboardsParams {
        products?: Products[];
        modes?: Modes[];
        runs?: Runs[];
        characters?: Characters[];
    }

    interface GetDailyLeaderboardsParams extends PaginationParams {
        products?: Products[];
        date?: string;
        production?: boolean;
    }

    interface GetPlayerEntriesParams {
        products?: Products[];
        production?: boolean;
    }

    interface GetPlayerDailyEntriesParams {
        products?: Products[];
        production?: boolean;
    }

    type Products = 'classic' | 'amplified';
    type Modes = 'standard' | 'no-return' | 'hard' | 'phasing' | 'randomizer' | 'mystery';
    type Runs = 'score' | 'speed' | 'seeded-score' | 'seeded-speed' | 'deathless';
    type Characters = 'all-characters' | 'all-characters-amplified' | 'aria' | 'bard' | 'bolt' | 'cadence' | 'coda' |
        'diamond' | 'dorian' | 'dove' | 'eli' | 'mary' | 'melody' | 'monk' | 'nocturna' | 'story-mode' | 'tempo';
}
