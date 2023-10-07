export const Scroll = (id:string) => {
	const el=document.getElementById(`${id}`)
	el.scrollIntoView({behavior: 'smooth', block:"nearest",inline:"center"});
}

