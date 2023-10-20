export type localRoomListType = {
	id:number,
	tenViTri:string,
	tinhThanh:string,
	quocGia:string,
	hinhAnh:string,
  }

export type localChooseType = {
	amountGuest:number,
	localInput:string[],
	rangePicker:string[],
}
  
export type PageType= {
	pageIndex:number,
	pageSize:number,
} 

export type DataByLocalType={
	data:[
		{
			id: number,
			tenViTri: string,
			tinhThanh: string,
			quocGia: string,
			hinhAnh: string,
		}
	]
}