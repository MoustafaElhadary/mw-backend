/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/orders": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.orders.id"];
          created_at?: parameters["rowFilter.orders.created_at"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["orders"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** orders */
          orders?: definitions["orders"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.orders.id"];
          created_at?: parameters["rowFilter.orders.created_at"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.orders.id"];
          created_at?: parameters["rowFilter.orders.created_at"];
        };
        body: {
          /** orders */
          orders?: definitions["orders"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          bio?: parameters["rowFilter.profiles.bio"];
          tiktok?: parameters["rowFilter.profiles.tiktok"];
          instagram?: parameters["rowFilter.profiles.instagram"];
          twitter?: parameters["rowFilter.profiles.twitter"];
          education?: parameters["rowFilter.profiles.education"];
          location?: parameters["rowFilter.profiles.location"];
          firstName?: parameters["rowFilter.profiles.firstName"];
          lastName?: parameters["rowFilter.profiles.lastName"];
          phoneNumber?: parameters["rowFilter.profiles.phoneNumber"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          bio?: parameters["rowFilter.profiles.bio"];
          tiktok?: parameters["rowFilter.profiles.tiktok"];
          instagram?: parameters["rowFilter.profiles.instagram"];
          twitter?: parameters["rowFilter.profiles.twitter"];
          education?: parameters["rowFilter.profiles.education"];
          location?: parameters["rowFilter.profiles.location"];
          firstName?: parameters["rowFilter.profiles.firstName"];
          lastName?: parameters["rowFilter.profiles.lastName"];
          phoneNumber?: parameters["rowFilter.profiles.phoneNumber"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          bio?: parameters["rowFilter.profiles.bio"];
          tiktok?: parameters["rowFilter.profiles.tiktok"];
          instagram?: parameters["rowFilter.profiles.instagram"];
          twitter?: parameters["rowFilter.profiles.twitter"];
          education?: parameters["rowFilter.profiles.education"];
          location?: parameters["rowFilter.profiles.location"];
          firstName?: parameters["rowFilter.profiles.firstName"];
          lastName?: parameters["rowFilter.profiles.lastName"];
          phoneNumber?: parameters["rowFilter.profiles.phoneNumber"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/qrs": {
    get: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.qrs.created_at"];
          profile_id?: parameters["rowFilter.qrs.profile_id"];
          view_count?: parameters["rowFilter.qrs.view_count"];
          id?: parameters["rowFilter.qrs.id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["qrs"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** qrs */
          qrs?: definitions["qrs"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.qrs.created_at"];
          profile_id?: parameters["rowFilter.qrs.profile_id"];
          view_count?: parameters["rowFilter.qrs.view_count"];
          id?: parameters["rowFilter.qrs.id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.qrs.created_at"];
          profile_id?: parameters["rowFilter.qrs.profile_id"];
          view_count?: parameters["rowFilter.qrs.view_count"];
          id?: parameters["rowFilter.qrs.id"];
        };
        body: {
          /** qrs */
          qrs?: definitions["qrs"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  orders: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    created_at?: string;
  };
  profiles: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    updated_at?: string;
    username?: string;
    avatar_url?: string;
    website?: string;
    bio?: string;
    tiktok?: string;
    instagram?: string;
    twitter?: string;
    education?: string;
    location?: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
  };
  qrs: {
    created_at?: string;
    /**
     * Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    profile_id: string;
    view_count?: number;
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
  };
}

export interface parameters {
  /** Preference */
  preferParams: "params=single-object";
  /** Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** Preference */
  preferCount: "count=none";
  /** Filtering Columns */
  select: string;
  /** On Conflict */
  on_conflict: string;
  /** Ordering */
  order: string;
  /** Limiting and Pagination */
  range: string;
  /** Limiting and Pagination */
  rangeUnit: string;
  /** Limiting and Pagination */
  offset: string;
  /** Limiting and Pagination */
  limit: string;
  /** orders */
  "body.orders": definitions["orders"];
  "rowFilter.orders.id": string;
  "rowFilter.orders.created_at": string;
  /** profiles */
  "body.profiles": definitions["profiles"];
  "rowFilter.profiles.id": string;
  "rowFilter.profiles.updated_at": string;
  "rowFilter.profiles.username": string;
  "rowFilter.profiles.avatar_url": string;
  "rowFilter.profiles.website": string;
  "rowFilter.profiles.bio": string;
  "rowFilter.profiles.tiktok": string;
  "rowFilter.profiles.instagram": string;
  "rowFilter.profiles.twitter": string;
  "rowFilter.profiles.education": string;
  "rowFilter.profiles.location": string;
  "rowFilter.profiles.firstName": string;
  "rowFilter.profiles.lastName": string;
  "rowFilter.profiles.phoneNumber": string;
  /** qrs */
  "body.qrs": definitions["qrs"];
  "rowFilter.qrs.created_at": string;
  "rowFilter.qrs.profile_id": string;
  "rowFilter.qrs.view_count": string;
  "rowFilter.qrs.id": string;
}

export interface operations {}

export interface external {}
