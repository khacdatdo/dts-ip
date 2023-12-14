export interface CloudflareAPIConfig {
  apiKey: string;
}

export interface ICloudflareListResponse<T> {
  success: boolean;
  result: T;
  result_info: {
    count: number;
    page: number;
    per_page: number;
    total_count: number;
    total_pages: number;
  };
  errors: Array<{
    code: number;
    message: string;
  }>;
  messages: Array<{
    code: number;
    message: string;
  }>;
}

export interface IQueryZoneParams {
  name?: string;
}
export interface IZone {
  id: string;
  name: string;
}

export interface IQueryDnsRecordParams {
  type?: string;
  name?: string;
  content?: string;
  search?: string;
}

export interface IUpsertDnsRecordsDto {
  type: "A";
  name: string;
  content: string;
  proxied?: boolean;
  comment?: string;
  tags?: string[];
  ttl?: number;
}

export interface IDnsRecord extends IUpsertDnsRecordsDto {
  id: string;
  created_on: StorageManager;
  proxiable: boolean;
  zone_id: string;
  zone_name: string;
}
