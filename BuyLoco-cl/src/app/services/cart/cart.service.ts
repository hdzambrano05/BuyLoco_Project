import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl?: string | null;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly storageKey = 'buyloco_cart';
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>(this.loadItems());
  readonly items$: Observable<CartItem[]> = this.itemsSubject.asObservable();
  readonly itemCount$: Observable<number> = this.items$.pipe(
    map((items) => items.reduce((total, item) => total + item.quantity, 0))
  );

  addItem(item: Omit<CartItem, 'quantity'>, quantity = 1): void {
    const items = [...this.itemsSubject.value];
    const existing = items.find((stored) => stored.id === item.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ ...item, quantity });
    }

    this.updateItems(items);
  }

  updateQuantity(id: number, quantity: number): void {
    const items = this.itemsSubject.value
      .map((item) => (item.id === id ? { ...item, quantity } : item))
      .filter((item) => item.quantity > 0);

    this.updateItems(items);
  }

  removeItem(id: number): void {
    const items = this.itemsSubject.value.filter((item) => item.id !== id);
    this.updateItems(items);
  }

  clearCart(): void {
    this.updateItems([]);
  }

  private updateItems(items: CartItem[]): void {
    this.itemsSubject.next(items);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  private loadItems(): CartItem[] {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return [];
    }

    try {
      const parsed = JSON.parse(stored) as CartItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn('No se pudo cargar el carrito desde localStorage', error);
      return [];
    }
  }
}
