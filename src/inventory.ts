export type StockMovement = { type: 'Entrada' | 'Salida' | 'Ajuste' | 'Pérdida'; qty: number }
export function applyMovement(stock: number, movement: StockMovement): number {
  if (!Number.isInteger(movement.qty) || movement.qty <= 0) throw new Error('La cantidad debe ser un entero positivo')
  const next = movement.type === 'Entrada' ? stock + movement.qty : stock - movement.qty
  if (next < 0) throw new Error('El stock no puede ser negativo')
  return next
}
export function isLowStock(stock: number, minimum: number): boolean { return minimum >= 0 && stock <= minimum }
export function suggestedRestock(stock: number, minimum: number): number { return Math.max(minimum * 2 - stock, 1) }
