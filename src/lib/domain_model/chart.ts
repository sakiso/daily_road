import type { ChartJson, Note } from '$lib/types/types';

export class Chart {
	private _chartJson: ChartJson;
	private _notes: Array<Note> = [];
	private _lpb: number; // 譜面の拍子 だいたい4か8
	private _bpm: number;

	constructor(chartJson: ChartJson) {
		this._chartJson = chartJson;
		this._bpm = chartJson.BPM;
		this._lpb = chartJson.notes[0].LPB;
		this.generateNotesFromJson();
	}

	// todo: generateNotesFromJsonメソッドつくる コンストラクタはJSONを受け取る
	public get notes(): Array<Note> {
		return this._notes.map((note) => ({ ...note }));
	}
	public get bpm(): number {
		return this._bpm;
	}

	private generateNotesFromJson(): void {
		this._notes = this._chartJson.notes.map((note) => {
			return {
				lane: note.block,
				// todo: 最後の60は1秒あたりのフレーム数なのでconstに切り出したい
				appearingFrame: (60 / (this._bpm * this._lpb)) * note.num * 60
				// appearingFrame: (((60 / this._bpm * this._lpb) * note.num) * 60)
			};
		});
	}
}
