'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface RichTextDisplayProps {
  content: string
  className?: string
}

export function RichTextDisplay({ content, className }: RichTextDisplayProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextStyle,
      Color,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    editable: false,
    content: '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  })

  useEffect(() => {
    if (editor && content) {
      try {
        // Try to parse as JSON first (TipTap format)
        const parsedContent = JSON.parse(content)
        editor.commands.setContent(parsedContent)
      } catch {
        // If parsing fails, treat as plain text or HTML
        editor.commands.setContent(content)
      }
    }
  }, [editor, content])

  if (!editor) {
    return null
  }

  return (
    <div className={cn('prose prose-gray max-w-none', className)}>
      <EditorContent editor={editor} />
    </div>
  )
}