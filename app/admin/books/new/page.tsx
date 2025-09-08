"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function NewBookPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfFile1, setPdfFile1] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadController, setUploadController] = useState<AbortController | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
    } else {
      toast.error('Please select a valid PDF file')
    }
  }

  const handleFile1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile1(file)
    } else {
      toast.error('Please select a valid PDF file')
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setThumbnailFile(file)
    } else {
      toast.error('Please select a valid image file')
    }
  }

  const uploadPdfToSupabase = async (file: File, controller?: AbortController): Promise<string> => {
    const supabase = createClient()
    const fileExt = 'pdf'
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `books/${fileName}`

    try {
      const uploadPromise = supabase.storage
        .from('E-Books')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Upload timeout - please try again')), 120000) // 2 minute timeout
      )

      const cancelPromise = controller ? new Promise((_, reject) => {
        controller.signal.addEventListener('abort', () => {
          reject(new Error('Upload cancelled by user'))
        })
      }) : Promise.resolve()

      const { data, error } = await Promise.race([
        uploadPromise,
        timeoutPromise,
        cancelPromise
      ]) as any

      if (error) {
        console.error('PDF upload error:', error)
        throw new Error(`PDF upload failed: ${error.message}`)
      }

      const { data: { publicUrl } } = supabase.storage
        .from('E-Books')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('PDF upload error:', error)
      throw error
    }
  }

  const uploadThumbnailToSupabase = async (file: File, controller?: AbortController): Promise<string> => {
    const supabase = createClient()
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `images/${fileName}`

    try {
      const uploadPromise = supabase.storage
        .from('E-Books')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Upload timeout - please try again')), 60000) // 1 minute timeout for images
      )

      const cancelPromise = controller ? new Promise((_, reject) => {
        controller.signal.addEventListener('abort', () => {
          reject(new Error('Upload cancelled by user'))
        })
      }) : Promise.resolve()

      const { data, error } = await Promise.race([
        uploadPromise,
        timeoutPromise,
        cancelPromise
      ]) as any

      if (error) {
        console.error('Thumbnail upload error:', error)
        throw new Error(`Thumbnail upload failed: ${error.message}`)
      }

      const { data: { publicUrl } } = supabase.storage
        .from('E-Books')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Thumbnail upload error:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error("Title is required")
      return
    }

    if (!pdfFile) {
      toast.error("Please select a PDF file")
      return
    }

    setIsLoading(true)
    setIsUploading(true)
    
    // Create abort controller for cancellation
    const controller = new AbortController()
    setUploadController(controller)
    
    try {
      // Upload PDF file to Supabase storage
      const pdfUrl = await uploadPdfToSupabase(pdfFile, controller)
      
      // Upload second PDF file if provided
      let pdfUrl1 = ''
      if (pdfFile1) {
        pdfUrl1 = await uploadPdfToSupabase(pdfFile1, controller)
      }
      
      // Upload thumbnail if provided
      let thumbnailUrl = ''
      if (thumbnailFile) {
        thumbnailUrl = await uploadThumbnailToSupabase(thumbnailFile, controller)
      }
      
      // Stop uploading animation after files are uploaded
      setIsUploading(false)
      setUploadController(null)
      
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('books')
        .insert([{
          title: formData.title,
          pdf_url: pdfUrl,
          pdf_url1: pdfUrl1,
          description: formData.description,
          thumbnail_url: thumbnailUrl
        }])
        .select()
      
      if (error) {
        console.error("Database error:", error)
        throw new Error(`Database error: ${error.message}`)
      }
      
      toast.success("Book created successfully!")
      
      // Reset form after successful creation
      setFormData({
        title: "",
        description: ""
      })
      setPdfFile(null)
      setPdfFile1(null)
      setThumbnailFile(null)
      
      // Reset file inputs
      const pdfFileInput = document.getElementById('pdf-file') as HTMLInputElement
      if (pdfFileInput) pdfFileInput.value = ''
      const pdfFile1Input = document.getElementById('pdf-file1') as HTMLInputElement
      if (pdfFile1Input) pdfFile1Input.value = ''
      const thumbnailInput = document.getElementById('thumbnail') as HTMLInputElement
      if (thumbnailInput) thumbnailInput.value = ''
      
      // Navigate to books list after a short delay to ensure user sees success message
      setTimeout(() => {
        router.push("/admin/books")
      }, 1000)
      
    } catch (error) {
      console.error("Error creating book:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to create book"
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
      setIsUploading(false)
      setUploadController(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/books">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add New Book</h1>
          <p className="text-muted-foreground">Create a new book entry for your website</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Book Details</CardTitle>
          <CardDescription>
            Fill in the information below to create a new book entry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter book title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdf-file">PDF File (Part 1) *</Label>
              <Input
                id="pdf-file"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {pdfFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdf-file1">PDF File (Part 2)</Label>
              <Input
                id="pdf-file1"
                type="file"
                accept=".pdf"
                onChange={handleFile1Change}
                className="cursor-pointer"
              />
              {pdfFile1 && (
                <p className="text-sm text-muted-foreground">
                  Selected: {pdfFile1.name} ({(pdfFile1.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail Image</Label>
              <Input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="cursor-pointer"
              />
              {thumbnailFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {thumbnailFile.name} ({(thumbnailFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
              {isUploading && (
                <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  </div>
                  <span>Uploading files... Please wait, this may take a few minutes for large files.</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter book description (optional)"
                rows={6}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading || isUploading}>
                {isLoading || isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isUploading ? 'Uploading...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Book
                  </>
                )}
              </Button>
              {isUploading ? (
                <Button 
                  type="button" 
                  variant="destructive"
                  onClick={() => {
                    if (uploadController) {
                      uploadController.abort()
                      setUploadController(null)
                    }
                    setIsUploading(false)
                    setIsLoading(false)
                    toast.info("Upload cancelled")
                  }}
                >
                  Cancel Upload
                </Button>
              ) : (
                <Link href="/admin/books">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}