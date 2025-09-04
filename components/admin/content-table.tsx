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
  type: "articles" | "videos" | "books" | "lectures" | "hadiths" | "ayats"
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onTogglePublished: (id: string, published: boolean) => void
}

export function ContentTable({ data, type, onEdit, onDelete, onTogglePublished }: ContentTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getColumnsForType = (type: string) => {
    switch (type) {
      case "articles":
        return ["Title", "Author", "Created"]
      case "videos":
        return ["Title", "YouTube Link", "Created"]
      case "books":
        return ["Title", "PDF URL", "Created"]
      case "hadiths":
      case "ayats":
        return ["Address", "Revelation", "Category", "Arabic Text", "Created"]
      default:
        return ["Title", "Created"]
    }
  }

  const columns = getColumnsForType(type)

  const renderCellContent = (item: any, column: string) => {
    switch (column) {
      case "Title":
        return (
          <div className="flex items-center gap-2">
            <span>{getTypeIcon(type)}</span>
            <span className="truncate max-w-xs">{item.title}</span>
          </div>
        )
      case "Author":
        return item.author || "Unknown"
      case "Content":
        return <span className="truncate max-w-xs">{item.content}</span>
      case "YouTube Link":
        return <span className="truncate max-w-xs">{item.youtube_link}</span>
      case "PDF URL":
        return <span className="truncate max-w-xs">{item.pdf_url}</span>
      case "Description":
        return <span className="truncate max-w-xs">{item.description}</span>
      case "Address":
        return (
          <div className="flex items-center gap-2">
            <span>{getTypeIcon(type)}</span>
            <span className="truncate max-w-xs">{item.address}</span>
          </div>
        )
      case "Revelation":
        return item.revelation || "N/A"
      case "Category":
        return item.category || "N/A"
      case "Arabic Text":
        return <span className="truncate max-w-xs" dir="rtl">{item.arabic_text}</span>
      case "Translation (EN)":
        return <span className="truncate max-w-xs">{item.translation_eng}</span>
      case "Created":
        return new Date(item.created_at).toLocaleDateString()
      default:
        return ""
    }
  }

  const filteredData = data.filter((item) => {
    const searchField = item.title || item.address || ""
    const matchesSearch = searchField.toLowerCase().includes(searchTerm.toLowerCase())
    // Remove status filtering since published field doesn't exist in DB
    return matchesSearch
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
              {columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">
                  No {type} found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell key={column} className={column === "Title" || column === "Address" ? "font-medium" : ""}>
                      {renderCellContent(item, column)}
                    </TableCell>
                  ))}
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
