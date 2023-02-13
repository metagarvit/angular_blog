import { CreateComment } from "./CreateComment"

export interface BlogDetails {
  id: number,
  title: string,
  description: string,
  lastModifiedDate: string,
  lastModifiedBy: string,
  userProfile: string,
  image: string,
  categoryId: string,
  comments: [
    CreateComment
  ]
}
