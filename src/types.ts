export type Product = { id:string; name:string; sku:string; category:string; stock:number; min:number; cost:number; price:number; unit:string; brand:string; active:boolean; updated:string; image?:string }
export type Movement = { id:string; productId:string; type:'Entrada'|'Salida'|'Ajuste'|'Pérdida'; qty:number; reason:string; date:string }
