export interface Song {
    id?: number;
    name:string;
    artist:string;
    votes:number;
    readonly entryTopDate:string;
}

export interface formError {
    artistError:boolean;
    songError:boolean;
    searchError:boolean;
}