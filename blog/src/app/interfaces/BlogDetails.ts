import { CreateComment } from "./CreateComment"

export interface BlogDetails {
  id: number,
  title: string,
  description: string,
  lastModifiedDate: string,
  categoryId: string
  comments: [
    CreateComment
  ]
}
