
export interface BlogDetails {
  id: number,
  title: string,
  description: string,
  categoryId: string
  comments: [
    {
      "id": number,
      "name": string,
      "email": string,
      "body": string
    }
  ]
}
