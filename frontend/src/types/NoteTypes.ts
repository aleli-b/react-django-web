interface NoteObjectProps {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

interface NoteProps {
  note: NoteObjectProps;
  onDelete: (id: number) => void;
}

export type { NoteObjectProps, NoteProps };