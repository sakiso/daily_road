// 増えてきたらファイル分離する

export interface RootPageLoadData {
	spotifyClientID: string;
}

export interface Note {
	lane: number;
	appearingFrame: number;
}

export interface ChartJson {
	// 指定したい型
	name: string;
	maxBlock: number;
	BPM: number;
	offset: number;
	notes: {
		LPB: number;
		num: number;
		block: number;
		type: number;
		notes: never[];
	}[];
};
