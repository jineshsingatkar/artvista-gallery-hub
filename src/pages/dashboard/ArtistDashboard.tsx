import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { categories, artworks, orders, inquiries } from "@/data/mockData";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArtUploadForm from "@/components/forms/ArtUploadForm";
import { useArtManagement } from "@/hooks/useArtManagement";

const ArtistDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { uploadArtwork, updateArtworkStatus } = useArtManagement();
  
  const [artDialogOpen, setArtDialogOpen] = useState(false);

  // Filter artist-specific data
  const artistArtworks = artworks.filter(art => art.artistId === user?.id);
  const artistOrders = orders.filter(order => order.artistId === user?.id);
  const artistInquiries = inquiries.filter(inquiry => inquiry.artistId === user?.id);

  const handleResponseToInquiry = (inquiryId: string) => {
    // In a real app, this would send a response to the inquiry
    toast({
      title: "Response Sent",
      description: "Your response has been sent to the customer.",
    });
  };

  const handleMarkOrderStatus = (orderId: string, status: 'shipped' | 'delivered') => {
    toast({
      title: "Order Updated",
      description: `Order #${orderId} has been marked as ${status}.`,
    });
  };

  if (!user || user.role !== "artist") {
    navigate('/login?redirect=/artist');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Artist Profile Sidebar */}
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
                      Artist • Member since {formatDate(user.createdAt)}
                    </p>
                    <div className="mt-6 w-full">
                      <nav className="space-y-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left"
                        >
                          Dashboard
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left"
                        >
                          My Artworks
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
                          Inquiries
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left"
                        >
                          Analytics
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left"
                        >
                          Profile Settings
                        </Button>
                      </nav>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-4">
                <Dialog open={artDialogOpen} onOpenChange={setArtDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">Add New Artwork</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                    <ArtUploadForm onArtworkAdded={() => setArtDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:w-2/3 lg:w-3/4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 max-w-md mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="artworks">Artworks</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-medium mb-1">Total Artworks</h3>
                        <p className="text-3xl font-bold">{artistArtworks.length}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {artistArtworks.filter(art => art.forSale).length} for sale
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-medium mb-1">Total Sales</h3>
                        <p className="text-3xl font-bold">{artistOrders.length}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatCurrency(artistOrders.reduce((sum, order) => sum + order.price, 0))} revenue
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-medium mb-1">Pending Orders</h3>
                        <p className="text-3xl font-bold">
                          {artistOrders.filter(order => order.status === 'pending').length}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Awaiting shipment
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-medium mb-1">Inquiries</h3>
                        <p className="text-3xl font-bold">{artistInquiries.length}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {artistInquiries.filter(inquiry => inquiry.status === 'pending').length} pending
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                      {artistOrders.length > 0 ? (
                        <div className="space-y-4">
                          {artistOrders.slice(0, 3).map((order) => (
                            <div key={order.id} className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{order.artTitle}</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(order.createdAt)} • {order.userName}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{formatCurrency(order.price)}</p>
                                <p className="text-sm capitalize">{order.status}</p>
                              </div>
                            </div>
                          ))}
                          {artistOrders.length > 3 && (
                            <Button asChild variant="link" className="p-0">
                              <Link to="#orders">View all orders</Link>
                            </Button>
                          )}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-4">
                          No orders yet. Keep adding artwork to attract buyers!
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Recent Inquiries</h3>
                      {artistInquiries.length > 0 ? (
                        <div className="space-y-4">
                          {artistInquiries.slice(0, 3).map((inquiry) => (
                            <div key={inquiry.id} className="border-b pb-4 last:border-0 last:pb-0">
                              <div className="flex justify-between items-start">
                                <p className="font-medium">{inquiry.artTitle}</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(inquiry.createdAt)}
                                </p>
                              </div>
                              <p className="text-sm mb-2">
                                From: {inquiry.userName} ({inquiry.userEmail})
                              </p>
                              <p className="text-sm text-muted-foreground mb-2">
                                "{inquiry.message}"
                              </p>
                              {inquiry.status === 'pending' && (
                                <Button size="sm" onClick={() => handleResponseToInquiry(inquiry.id)}>
                                  Respond
                                </Button>
                              )}
                            </div>
                          ))}
                          {artistInquiries.length > 3 && (
                            <Button asChild variant="link" className="p-0">
                              <Link to="#inquiries">View all inquiries</Link>
                            </Button>
                          )}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-4">
                          No inquiries yet. Keep adding artwork to attract interest!
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Artworks Tab */}
                <TabsContent value="artworks">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold">My Artworks</h3>
                        <Button onClick={() => setArtDialogOpen(true)}>Add New Artwork</Button>
                      </div>

                      {artistArtworks.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {artistArtworks.map((art) => (
                            <Card key={art.id}>
                              <div className="aspect-[4/3] relative">
                                <img 
                                  src={art.imageUrl} 
                                  alt={art.title} 
                                  className="object-cover w-full h-full"
                                />
                                <div className="absolute top-2 right-2">
                                  <Badge variant={art.forSale ? "default" : "secondary"} className="capitalize">
                                    {art.forSale ? "For Sale" : "Inquiry Only"}
                                  </Badge>
                                </div>
                              </div>
                              <CardContent className="p-4">
                                <h4 className="font-medium line-clamp-1">{art.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                  {art.description}
                                </p>
                                <div className="mt-2 flex justify-between">
                                  <span className="text-sm">{art.category}</span>
                                  {art.price ? (
                                    <span className="font-medium">{formatCurrency(art.price)}</span>
                                  ) : (
                                    <span className="text-sm text-muted-foreground">Inquiry only</span>
                                  )}
                                </div>
                                <div className="mt-4 flex space-x-2">
                                  <Button asChild variant="outline" size="sm" className="flex-1">
                                    <Link to={`/art/${art.id}`}>View</Link>
                                  </Button>
                                  <Button variant="outline" size="sm" className="flex-1">
                                    Edit
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground mb-4">
                            You haven't added any artworks yet.
                          </p>
                          <Button onClick={() => setArtDialogOpen(true)}>
                            Add Your First Artwork
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Orders Tab */}
                <TabsContent value="orders" id="orders">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-6">Order Management</h3>
                      
                      {artistOrders.length > 0 ? (
                        <div className="space-y-6">
                          {artistOrders.map((order) => (
                            <div key={order.id} className="border rounded-lg p-4">
                              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
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
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <h5 className="text-sm font-medium mb-2">Customer Information</h5>
                                  <p className="text-sm">{order.userName}</p>
                                  <p className="text-sm">
                                    {order.shippingAddress.street}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                                    {order.shippingAddress.country}
                                  </p>
                                </div>
                                
                                <div>
                                  <h5 className="text-sm font-medium mb-2">Order Details</h5>
                                  <div className="flex justify-between text-sm">
                                    <span>Price:</span>
                                    <span className="font-medium">{formatCurrency(order.price)}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Payment Status:</span>
                                    <span className={order.paymentStatus === 'paid' ? 'text-green-600 dark:text-green-400' : ''}>
                                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                    </span>
                                  </div>
                                  {order.paymentId && (
                                    <div className="flex justify-between text-sm">
                                      <span>Payment ID:</span>
                                      <span>{order.paymentId}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                <Button variant="outline" size="sm">View Full Details</Button>
                                {order.status === 'pending' && (
                                  <Button size="sm" onClick={() => handleMarkOrderStatus(order.id, 'shipped')}>
                                    Mark as Shipped
                                  </Button>
                                )}
                                {order.status === 'shipped' && (
                                  <Button size="sm" onClick={() => handleMarkOrderStatus(order.id, 'delivered')}>
                                    Mark as Delivered
                                  </Button>
                                )}
                                <Button variant="outline" size="sm">Contact Customer</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground mb-4">
                            You haven't received any orders yet.
                          </p>
                          <Button asChild>
                            <Link to="/gallery">View Your Artwork</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Inquiries Tab */}
                <TabsContent value="inquiries" id="inquiries">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-6">Customer Inquiries</h3>
                      
                      {artistInquiries.length > 0 ? (
                        <div className="space-y-6">
                          {artistInquiries.map((inquiry) => (
                            <div key={inquiry.id} className="border rounded-lg p-4">
                              <div className="flex justify-between mb-2">
                                <h4 className="font-medium">{inquiry.artTitle}</h4>
                                <Badge variant={
                                  inquiry.status === 'responded' ? 'outline' :
                                  inquiry.status === 'closed' ? 'secondary' :
                                  'default'
                                }>
                                  {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                                </Badge>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-2">
                                From {inquiry.userName} ({inquiry.userEmail}) • {formatDate(inquiry.createdAt)}
                              </p>
                              
                              <div className="bg-muted/50 p-3 rounded-md mb-4">
                                <p className="text-sm italic">"{inquiry.message}"</p>
                              </div>
                              
                              {inquiry.status === 'pending' ? (
                                <div className="space-y-4">
                                  <Textarea 
                                    placeholder="Type your response here..."
                                    className="min-h-[100px]"
                                  />
                                  <div className="flex flex-wrap gap-2">
                                    <Button onClick={() => handleResponseToInquiry(inquiry.id)}>
                                      Send Response
                                    </Button>
                                    <Button variant="outline">Mark as Closed</Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  <Button variant="outline">View Conversation</Button>
                                  {inquiry.status !== 'closed' && (
                                    <Button variant="outline">Mark as Closed</Button>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground mb-4">
                            You haven't received any inquiries yet.
                          </p>
                          <Button asChild>
                            <Link to="/gallery">View Your Artwork</Link>
                          </Button>
                        </div>
                      )}
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

export default ArtistDashboard;
