export interface HomeResponse {
  pageNo: number
  pageSize: number
  totalElements: number
  totalPages: number
  last: boolean
  content: [Content]

}

export interface Content {
  id: number,
  title: string,
  description: string,
  categoryId: string,

  createDate: string,

  lastModifiedBy: string,
  userProfile : string,

  lastModifiedDate: string,
  image: string
}
