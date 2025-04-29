
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { users, artworks, orders, inquiries } from "@/data/mockData";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState<"all" | "user" | "artist">("all");

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (userFilter === "all") return matchesSearch;
    return matchesSearch && u.role === userFilter;
  });

  if (!user || user.role !== "admin") {
    navigate('/login?redirect=/admin');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Admin Sidebar */}
            <div className="md:w-1/4 lg:w-1/5">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      Administrator
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
                          User Management
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left"
                        >
                          Artwork Management
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left"
                        >
                          Orders Management
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left"
                        >
                          Reports
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
            </div>

            {/* Main Content */}
            <div className="md:w-3/4 lg:w-4/5">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 max-w-md mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="artists">Artists</TabsTrigger>
                  <TabsTrigger value="artworks">Artworks</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-medium mb-1">Total Users</h3>
                        <p className="text-3xl font-bold">{users.length}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {users.filter(u => u.role === "user").length} buyers, {users.filter(u => u.role === "artist").length} artists
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-medium mb-1">Total Artworks</h3>
                        <p className="text-3xl font-bold">{artworks.length}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {artworks.filter(art => art.forSale).length} for sale
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-medium mb-1">Total Orders</h3>
                        <p className="text-3xl font-bold">{orders.length}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatCurrency(orders.reduce((sum, order) => sum + order.price, 0))} revenue
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-medium mb-1">Pending Issues</h3>
                        <p className="text-3xl font-bold">
                          {orders.filter(order => order.status === 'pending').length + inquiries.filter(inquiry => inquiry.status === 'pending').length}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Require attention
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
                        <div className="space-y-4">
                          {users.slice(0, 5).map((user) => (
                            <div key={user.id} className="flex items-center">
                              <Avatar className="h-10 w-10 mr-4">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {user.email} • {user.role}
                                </p>
                              </div>
                              <Button variant="ghost" size="sm">View</Button>
                            </div>
                          ))}
                          <Button asChild variant="link" className="p-0">
                            <Link to="#users">View all users</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                        <div className="space-y-4">
                          {orders.slice(0, 5).map((order) => (
                            <div key={order.id} className="flex items-center">
                              <div className="flex-1">
                                <p className="font-medium">{order.artTitle}</p>
                                <p className="text-sm text-muted-foreground">
                                  {order.userName} • {formatDate(order.createdAt)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{formatCurrency(order.price)}</p>
                                <p className="text-sm capitalize">{order.status}</p>
                              </div>
                            </div>
                          ))}
                          <Button asChild variant="link" className="p-0">
                            <Link to="#orders">View all orders</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Users Tab */}
                <TabsContent value="users" id="users">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h3 className="text-lg font-semibold">User Management</h3>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                          <Input 
                            placeholder="Search users..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-[200px]"
                          />
                          <Select 
                            value={userFilter} 
                            onValueChange={(value) => setUserFilter(value as typeof userFilter)}
                          >
                            <SelectTrigger className="w-full sm:w-[150px]">
                              <SelectValue placeholder="Filter by role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Users</SelectItem>
                              <SelectItem value="user">Buyers</SelectItem>
                              <SelectItem value="artist">Artists</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="rounded-md border">
                        <div className="bg-muted/50 p-3 grid grid-cols-4 gap-4 font-medium">
                          <div>Name</div>
                          <div>Email</div>
                          <div>Role</div>
                          <div className="text-right">Actions</div>
                        </div>
                        <div className="divide-y">
                          {filteredUsers.map((user) => (
                            <div key={user.id} className="p-3 grid grid-cols-4 gap-4 items-center">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{user.name}</span>
                              </div>
                              <div className="text-sm">{user.email}</div>
                              <div className="text-sm capitalize">{user.role}</div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm">View</Button>
                                <Button variant="outline" size="sm">Edit</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {filteredUsers.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">
                            No users found matching your search criteria.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Artists Tab */}
                <TabsContent value="artists">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold">Artist Management</h3>
                        <Input 
                          placeholder="Search artists..." 
                          className="w-[250px]"
                        />
                      </div>

                      <div className="space-y-6">
                        {users.filter(u => u.role === "artist").map((artist) => (
                          <div key={artist.id} className="border rounded-lg">
                            <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex items-center mb-4 sm:mb-0">
                                <Avatar className="h-14 w-14 mr-4">
                                  <AvatarImage src={artist.avatar} alt={artist.name} />
                                  <AvatarFallback>{getInitials(artist.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{artist.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {artist.email} • Joined on {formatDate(artist.createdAt)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <Button variant="outline" size="sm">View Profile</Button>
                                <Button variant="outline" size="sm">Edit Details</Button>
                                <Button variant="outline" size="sm">View Artwork</Button>
                              </div>
                            </div>
                            <div className="border-t bg-muted/50 p-4">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Total Artworks</p>
                                  <p className="font-medium">
                                    {artworks.filter(art => art.artistId === artist.id).length}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Total Sales</p>
                                  <p className="font-medium">
                                    {orders.filter(order => order.artistId === artist.id).length} orders
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Revenue</p>
                                  <p className="font-medium">
                                    {formatCurrency(
                                      orders
                                        .filter(order => order.artistId === artist.id)
                                        .reduce((sum, order) => sum + order.price, 0)
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Artworks Tab */}
                <TabsContent value="artworks">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold">Artwork Management</h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Input 
                            placeholder="Search artworks..." 
                            className="w-full sm:w-[250px]"
                          />
                          <Select defaultValue="all">
                            <SelectTrigger className="w-full sm:w-[180px]">
                              <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              <SelectItem value="paintings">Paintings</SelectItem>
                              <SelectItem value="sculptures">Sculptures</SelectItem>
                              <SelectItem value="digitalArt">Digital Art</SelectItem>
                              <SelectItem value="photography">Photography</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {artworks.map((art) => (
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
                              <p className="text-sm text-muted-foreground mt-1">
                                by {art.artistName}
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

export default AdminDashboard;
