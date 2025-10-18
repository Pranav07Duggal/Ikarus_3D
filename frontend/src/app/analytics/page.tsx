"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Search, TrendingUp, Package, DollarSign, Star } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface FurnitureItem {
  id: string
  name: string
  category: string
  price: number
  stock: number
  rating: number
  reviews: number
  sales: number
  style: string
}

// Mock furniture database
const FURNITURE_DATABASE: FurnitureItem[] = [
  {
    id: "1",
    name: "Modern Minimalist Sofa",
    category: "Seating",
    price: 1299,
    stock: 15,
    rating: 4.8,
    reviews: 234,
    sales: 156,
    style: "Modern",
  },
  {
    id: "2",
    name: "Scandinavian Coffee Table",
    category: "Tables",
    price: 399,
    stock: 32,
    rating: 4.6,
    reviews: 189,
    sales: 298,
    style: "Scandinavian",
  },
  {
    id: "3",
    name: "Industrial Floor Lamp",
    category: "Lighting",
    price: 249,
    stock: 48,
    rating: 4.7,
    reviews: 156,
    sales: 412,
    style: "Industrial",
  },
  {
    id: "4",
    name: "Velvet Accent Chair",
    category: "Seating",
    price: 599,
    stock: 22,
    rating: 4.9,
    reviews: 267,
    sales: 189,
    style: "Contemporary",
  },
  {
    id: "5",
    name: "Wooden Dining Table",
    category: "Tables",
    price: 899,
    stock: 8,
    rating: 4.5,
    reviews: 145,
    sales: 87,
    style: "Rustic",
  },
  {
    id: "6",
    name: "Pendant Light Fixture",
    category: "Lighting",
    price: 179,
    stock: 56,
    rating: 4.4,
    reviews: 98,
    sales: 523,
    style: "Modern",
  },
  {
    id: "7",
    name: "Leather Recliner",
    category: "Seating",
    price: 1499,
    stock: 5,
    rating: 4.9,
    reviews: 312,
    sales: 67,
    style: "Contemporary",
  },
  {
    id: "8",
    name: "Glass Side Table",
    category: "Tables",
    price: 299,
    stock: 41,
    rating: 4.3,
    reviews: 76,
    sales: 234,
    style: "Modern",
  },
]

export default function AnalyticsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredItems = useMemo(() => {
    return FURNITURE_DATABASE.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const categories = Array.from(new Set(FURNITURE_DATABASE.map((item) => item.category)))

  // Analytics data
  const categoryStats = useMemo(() => {
    const stats: Record<string, { category: string; count: number; revenue: number }> = {}
    FURNITURE_DATABASE.forEach((item) => {
      if (!stats[item.category]) {
        stats[item.category] = { category: item.category, count: 0, revenue: 0 }
      }
      stats[item.category].count += item.sales
      stats[item.category].revenue += item.price * item.sales
    })
    return Object.values(stats)
  }, [])

  const priceDistribution = useMemo(() => {
    const ranges = [
      { range: "$0-500", count: 0 },
      { range: "$500-1000", count: 0 },
      { range: "$1000+", count: 0 },
    ]
    FURNITURE_DATABASE.forEach((item) => {
      if (item.price < 500) ranges[0].count++
      else if (item.price < 1000) ranges[1].count++
      else ranges[2].count++
    })
    return ranges
  }, [])

  const totalRevenue = FURNITURE_DATABASE.reduce((sum, item) => sum + item.price * item.sales, 0)
  const totalSales = FURNITURE_DATABASE.reduce((sum, item) => sum + item.sales, 0)
  const avgRating = (
    FURNITURE_DATABASE.reduce((sum, item) => sum + item.rating, 0) / FURNITURE_DATABASE.length
  ).toFixed(1)
  const totalItems = FURNITURE_DATABASE.length

  const COLORS = ["#8b5cf6", "#06b6d4", "#f97316"]

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Furniture Analytics</h1>
          <p className="text-muted-foreground">
            Real-time insights into your furniture inventory and sales performance
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-2xl md:text-3xl font-bold text-purple-400 dark:text-purple-300">
                  ${(totalRevenue / 1000).toFixed(1)}K
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-400/50" />
            </div>
          </Card>

          <Card className="p-6 border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 backdrop-blur hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Sales</p>
                <p className="text-2xl md:text-3xl font-bold text-cyan-400 dark:text-cyan-300">
                  {totalSales.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-cyan-400/50" />
            </div>
          </Card>

          <Card className="p-6 border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-orange-500/5 backdrop-blur hover:border-orange-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Rating</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-400 dark:text-orange-300">{avgRating}★</p>
              </div>
              <Star className="h-8 w-8 text-orange-400/50" />
            </div>
          </Card>

          <Card className="p-6 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 backdrop-blur hover:border-emerald-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Items</p>
                <p className="text-2xl md:text-3xl font-bold text-emerald-400 dark:text-emerald-300">{totalItems}</p>
              </div>
              <Package className="h-8 w-8 text-emerald-400/50" />
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Sales by Category</h2>
            <ChartContainer
              config={{
                sales: { label: "Sales", color: "hsl(var(--primary))" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="category" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>

          <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Price Distribution</h2>
            <ChartContainer
              config={{
                count: { label: "Items", color: "hsl(var(--primary))" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ range, count }) => `${range}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>
        </div>

        {/* Inventory Table */}
        <Card className="border-primary/10 bg-card/50 backdrop-blur">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Inventory</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  size="sm"
                >
                  All
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Sales</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rating</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">{item.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-purple-400 dark:text-purple-300">
                      ${item.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          item.stock > 20
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                            : item.stock > 10
                              ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                              : "bg-red-500/20 text-red-700 dark:text-red-300"
                        }`}
                      >
                        {item.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-cyan-400 dark:text-cyan-300">{item.sales}</td>
                    <td className="px-6 py-4 text-sm text-orange-400 dark:text-orange-300 font-semibold">
                      {item.rating}★
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  )
}
