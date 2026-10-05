import { describe, expect, it } from 'vitest'
import { applyMovement, isLowStock, suggestedRestock } from './inventory'
describe('reglas de inventario', () => {
  it('aplica entradas y salidas', () => { expect(applyMovement(5,{type:'Entrada',qty:3})).toBe(8); expect(applyMovement(8,{type:'Salida',qty:3})).toBe(5) })
  it('rechaza cantidades inválidas y stock negativo', () => { expect(()=>applyMovement(5,{type:'Salida',qty:0})).toThrow(); expect(()=>applyMovement(2,{type:'Salida',qty:3})).toThrow() })
  it('detecta mínimos y sugiere reposición explicable', () => { expect(isLowStock(5,5)).toBe(true); expect(isLowStock(8,5)).toBe(false); expect(suggestedRestock(5,5)).toBe(5) })
})
