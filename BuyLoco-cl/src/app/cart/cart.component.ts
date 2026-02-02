import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartItem, CartService } from '../services/cart/cart.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  items: CartItem[] = [];
  total = 0;
  private subscription?: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscription = this.cartService.items$.subscribe((items) => {
      this.items = items;
      this.total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  get imageUrl(): string {
    return environment.imageUrl;
  }

  updateQuantity(item: CartItem, quantity: number): void {
    const safeQuantity = Number.isNaN(quantity) ? item.quantity : quantity;
    this.cartService.updateQuantity(item.id, safeQuantity);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.id);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
