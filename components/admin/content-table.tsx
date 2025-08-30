"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Eye, Search, Plus } from "lucide-react"
import Link from "next/link"

interface ContentTableProps {
  data: any[]
  type: "articles" | "videos" | "books" | "lectures"
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onTogglePublished: (id: string, published: boolean) => void
}

export function ContentTable({ data, type, onEdit, onDelete, onTogglePublished }: ContentTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredData = data.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && item.published) ||
      (statusFilter === "draft" && !item.published)
    return matchesSearch && matchesStatus
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "videos":
        return "🎥"
      case "books":
        return "📚"
      case "lectures":
        return "🎤"
      default:
        return "📄"
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${type}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Link href={`/admin/${type}/new`}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add {type.slice(0, -1)}
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No {type} found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span>{getTypeIcon(type)}</span>
                      <span className="truncate max-w-xs">{item.title}</span>
                      {item.featured && <Badge variant="secondary">Featured</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>{item.author?.full_name || "Unknown"}</TableCell>
                  <TableCell>{item.category?.name || "Uncategorized"}</TableCell>
                  <TableCell>
                    <Badge variant={item.published ? "default" : "secondary"}>
                      {item.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.views?.toLocaleString() || 0}</TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/${type}/${item.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => onEdit(item.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onTogglePublished(item.id, !item.published)}
                        className={item.published ? "text-orange-600" : "text-green-600"}
                      >
                        {item.published ? "Unpublish" : "Publish"}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => onDelete(item.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
