"use client";

import { EditorToolbar } from "@/inbox/components/EditorToolbar";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

type TiptapProps = {
  content: string;
  onChange: (richText: string) => void;
};

export const Tiptap = ({ content, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content,
    editorProps: {
      attributes: {
        class: "rounded-md p-4 border min-h-[150px] border-input bg-background",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });
  return (
    <div className="flex flex-col space-y-3 justify-stretch min-h-[250px]">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
