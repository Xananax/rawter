import {inspect} from 'util'

export default function checkOut(obj){
	console.log(inspect(obj,{depth:null,colors:true}));
}