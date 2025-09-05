'use client'

import React, { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Bold, Italic, Underline, List, ListOrdered, Link } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SimpleEditorProps {
  value?: string
  onChange?: (content: string) => void
  placeholder?: string
  className?: string
}

export function QuillEditor({
  value = '',
  onChange,
  placeholder = 'Start writing...',
  className
}: SimpleEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value
    }
  }, [value, isMounted])

  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      execCommand('createLink', url)
    }
  }

  if (!isMounted) {
    return <div className="h-32 bg-gray-100 animate-pulse rounded" />
  }

  return (
    <div className={cn('bg-white border border-input rounded-md', className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand('bold')}
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand('italic')}
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand('underline')}
          className="h-8 w-8 p-0"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand('insertUnorderedList')}
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand('insertOrderedList')}
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertLink}
          className="h-8 w-8 p-0"
        >
          <Link className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[200px] p-3 focus:outline-none"
        style={{
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
      
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}

// Display component for rendering content
export function QuillDisplay({ content, className }: { content: string; className?: string }) {
  return (
    <div 
      className={cn('prose prose-sm max-w-none', className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}