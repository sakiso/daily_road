import type { ChartJson, Note } from '$lib/types/types';

export class Chart {
	private _notesWidth: number;
	private _notesHeight: number;
	private _noteSpeed = 1; // 1フレームごとにノーツが落ちる量。基本1固定
	private _chartJson: ChartJson;
	private _notes: Array<Note> = [];
	private _lpb: number; // 譜面の拍子 だいたい4か8
	private _bpm: number;

	constructor(noteWidth: number, noteHeight: number, chartJson: ChartJson) {
		this._notesWidth = noteWidth;
		this._notesHeight = noteHeight;
		this._chartJson = chartJson;
		this._bpm = chartJson.BPM;
		this._lpb = chartJson.notes[0].LPB;
		this.generateNotesFromJson();
	}

	// todo: generateNotesFromJsonメソッドつくる コンストラクタはJSONを受け取る

	public get width(): number {
		return this._notesWidth;
	}
	public get height(): number {
		return this._notesHeight;
	}
	public get noteSpeed(): number {
		return this._noteSpeed;
	}
	public get notes(): Array<Note> {
		return this._notes;
	}
	public get bpm(): number {
		return this._bpm;
	}

	private generateNotesFromJson(): void {
		this._notes = this._chartJson.notes.map((note) => {
			return {
				lane: note.block,
				// todo: 最後の60は1秒あたりのフレーム数なのでconstに切り出したい
				appearingFrame: Math.round((60 / this._bpm) * this._lpb * note.num * 60)
			};
		});
	}
}