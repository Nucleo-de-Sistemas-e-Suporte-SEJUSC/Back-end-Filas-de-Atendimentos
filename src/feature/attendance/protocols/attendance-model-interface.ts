export interface IAttendanceModel {
	cpf: string;
	name: string;
	service: "PAV" | "RCN";
	queue_type: "P" | "N";
}
