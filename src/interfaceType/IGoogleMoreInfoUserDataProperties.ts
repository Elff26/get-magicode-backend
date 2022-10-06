export default interface IGoogleMoreInfoUserData {
    resourceName: string,
    etag: string,
    birthdays: [
        {
            metadata: {
                primary: boolean,
                source: {
                    type: string,
                    id: string
                }
            },
            date: {
                year: string,
                month: string,
                day: string
            }
        }
    ]
    phoneNumbers: [
        {
          metadata: {
            primary: boolean,
            verified: boolean,
            source: {
              type: string,
              id: string
            }
          },
          value: string
          canonicalForm: string
          type: string,
          formattedType: string
        }
    ],
    error?: {
        status: string
    }
}