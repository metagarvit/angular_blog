export interface CreatePost
{

    "id": number,
    "title":string,
    "description": string,
    "image": string,
    "comments":  {
      "id": number,
      "name": string,
      "email": string,
      "body":string
  },
    "categoryId": number,
    "createdBy": string,
    "createDate": string,
    "lastModifiedBy":string,
    "lastModifiedDate": string

  }
