"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"
// Supabase client removed
import { toast } from "sonner"

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    // Placeholder users data - database functionality removed
    const placeholderUsers = [
      {
        id: "1",
        full_name: "Dr. Ahmad Ghamidi",
        email: "ahmad@example.com",
        role: "scholar",
        bio: "Islamic scholar and teacher",
        created_at: new Date().toISOString(),
        avatar_url: null
      },
      {
        id: "2",
        full_name: "Ali Hassan",
        email: "ali@example.com",
        role: "student",
        bio: "Student of Islamic studies",
        created_at: new Date().toISOString(),
        avatar_url: null
      },
      {
        id: "3",
        full_name: "Admin User",
        email: "admin@example.com",
        role: "admin",
        bio: "System administrator",
        created_at: new Date().toISOString(),
        avatar_url: null
      }
    ]
    
    setUsers(placeholderUsers)
    setIsLoading(false)
  }, [])

  const handleRoleChange = async (userId: string, newRole: string) => {
    // Placeholder role change - database functionality removed
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    )
    setUsers(updatedUsers)
    toast.success("Role updated (placeholder functionality)")
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/10 text-red-700 dark:text-red-300"
      case "scholar":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-300"
      default:
        return "bg-blue-500/10 text-blue-700 dark:text-blue-300"
    }
  }

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users Management</h1>
        <p className="text-muted-foreground">Manage user accounts and permissions</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="scholar">Scholar</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.full_name} />
                        <AvatarFallback>{getInitials(user.full_name || "U")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.full_name || "Unknown User"}</p>
                        <p className="text-sm text-muted-foreground">{user.bio || "No bio"}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Active</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Select
                        value={user.role}
                        onValueChange={(newRole) => handleRoleChange(user.id, newRole)}
                        disabled={user.role === "admin"}
                      >
                        <SelectTrigger className="w-24 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="scholar">Scholar</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
