
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "You will be redirected to the payment page.",
    });
    // In a real app, this would redirect to a checkout page
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
          
          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b last:border-0">
                        <div className="flex-shrink-0 w-24 h-24 rounded overflow-hidden mb-4 sm:mb-0 sm:mr-4">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <Link to={`/art/${item.id}`} className="font-medium hover:underline">
                            {item.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            by {item.artistName}
                          </p>
                          <p className="font-medium mt-1">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                        
                        <div className="flex items-center mt-4 sm:mt-0">
                          <div className="flex items-center border rounded overflow-hidden mr-4">
                            <button 
                              className="px-3 py-1 border-r hover:bg-muted transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <Input 
                              type="number" 
                              className="w-12 text-center border-none focus-visible:ring-0"
                              value={item.quantity}
                              min="1"
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            />
                            <button 
                              className="px-3 py-1 border-l hover:bg-muted transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        variant="outline" 
                        onClick={clearCart}
                      >
                        Clear Cart
                      </Button>
                      
                      <Button asChild variant="ghost">
                        <Link to="/gallery">Continue Shopping</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span>Subtotal ({totalItems} items)</span>
                        <span>{formatCurrency(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>Calculated at checkout</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{formatCurrency(totalPrice)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    
                    <div className="mt-4 text-xs text-center text-muted-foreground">
                      Secure checkout powered by Stripe
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any artwork to your cart yet.
              </p>
              <Button asChild size="lg">
                <Link to="/gallery">Browse Gallery</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
