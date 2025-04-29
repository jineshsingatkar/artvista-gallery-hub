
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { orders } from "@/data/mockData";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock user data
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [street, setStreet] = useState(user?.address?.street || "");
  const [city, setCity] = useState(user?.address?.city || "");
  const [state, setState] = useState(user?.address?.state || "");
  const [postalCode, setPostalCode] = useState(user?.address?.postalCode || "");
  const [country, setCountry] = useState(user?.address?.country || "");

  // Filter orders for the current user
  const userOrders = orders.filter(order => order.userId === user?.id);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile in the database
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  if (!user) {
    navigate('/login?redirect=/profile');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* User Profile Summary */}
            <div className="md:w-1/3 lg:w-1/4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      Member since {formatDate(user.createdAt)}
                    </p>
                    <div className="mt-6 w-full">
                      <nav className="space-y-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left"
                        >
                          Profile
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left"
                        >
                          Orders
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left"
                        >
                          Favorites
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left"
                        >
                          Settings
                        </Button>
                      </nav>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/gallery">Browse Gallery</Link>
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:w-2/3 lg:w-3/4">
              <Tabs defaultValue="profile">
                <TabsList className="grid grid-cols-3 max-w-md mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                  <Card>
                    <CardContent className="pt-6">
                      <form onSubmit={handleProfileUpdate}>
                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Your email address"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Your phone number"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="avatar">Profile Picture</Label>
                            <Input
                              id="avatar"
                              type="file"
                              accept="image/*"
                              className="cursor-pointer"
                            />
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold mb-4">Address Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="street">Street Address</Label>
                            <Input
                              id="street"
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                              placeholder="Street address"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              placeholder="City"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State/Province</Label>
                            <Input
                              id="state"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                              placeholder="State or province"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postalCode">Postal/ZIP Code</Label>
                            <Input
                              id="postalCode"
                              value={postalCode}
                              onChange={(e) => setPostalCode(e.target.value)}
                              placeholder="Postal or ZIP code"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              placeholder="Country"
                            />
                          </div>
                        </div>

                        <Button type="submit">Update Profile</Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Orders Tab */}
                <TabsContent value="orders">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Order History</h3>
                      
                      {userOrders.length > 0 ? (
                        <div className="space-y-4">
                          {userOrders.map((order) => (
                            <div key={order.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h4 className="font-medium">{order.artTitle}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Order #{order.id} • {formatDate(order.createdAt)}
                                  </p>
                                </div>
                                <Badge className={
                                  order.status === 'delivered' ? 'bg-green-500' :
                                  order.status === 'shipped' ? 'bg-blue-500' :
                                  'bg-yellow-500'
                                }>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </div>
                              
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Artist:</span>
                                <span>{order.artistName}</span>
                              </div>
                              
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Price:</span>
                                <span className="font-medium">{formatCurrency(order.price)}</span>
                              </div>
                              
                              <div className="flex justify-between text-sm mb-4">
                                <span className="text-muted-foreground">Payment Status:</span>
                                <span className={order.paymentStatus === 'paid' ? 'text-green-600 dark:text-green-400' : ''}>
                                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                </span>
                              </div>
                              
                              <Link to={`/order/${order.id}`}>
                                <Button variant="outline" size="sm">View Details</Button>
                              </Link>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                          <Button asChild>
                            <Link to="/gallery">Browse Gallery</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Payment Tab */}
                <TabsContent value="payment">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
                      
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="mr-4">
                              <svg 
                                className="h-8 w-8" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                                <path d="M2 10H22" stroke="currentColor" strokeWidth="2" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">Visa ending in 4242</p>
                              <p className="text-sm text-muted-foreground">Expires 12/25</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                        
                        <div className="border rounded-lg p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="mr-4">
                              <svg 
                                className="h-8 w-8" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                                <path d="M2 10H22" stroke="currentColor" strokeWidth="2" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">Mastercard ending in 7890</p>
                              <p className="text-sm text-muted-foreground">Expires 09/24</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                        
                        <Button variant="outline" className="w-full">
                          Add New Payment Method
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
