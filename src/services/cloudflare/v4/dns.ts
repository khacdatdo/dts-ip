import axios, { AxiosInstance } from "axios";
import {
  CloudflareAPIConfig,
  ICloudflareListResponse,
  IDnsRecord,
  IQueryDnsRecordParams,
  IUpsertDnsRecordsDto,
} from "./interface";

export class CloudflareV4Dns {
  protected axiosInstance: AxiosInstance = null;

  constructor(config: CloudflareAPIConfig) {
    this.axiosInstance = axios.create({
      baseURL: "https://api.cloudflare.com/client/v4",
      headers: {
        Authorization: "Bearer " + config.apiKey,
      },
    });
  }

  async list(zoneId: string, query?: IQueryDnsRecordParams): Promise<ICloudflareListResponse<IDnsRecord[]>> {
    const response = await this.axiosInstance.get(`/zones/${zoneId}/dns_records`, { params: query });
    return response.data;
  }

  async upsert(zoneId: string, record: IUpsertDnsRecordsDto): Promise<[boolean, IDnsRecord | IUpsertDnsRecordsDto]> {
    const records = await this.list(zoneId, { name: record.name, type: record.type });
    const existedRecord = records.result.find((rec) => rec.type === record.type && rec.name === record.name);
    if (!existedRecord) {
      const response = await this.axiosInstance.post(`/zones/${zoneId}/dns_records`, record);
      return [true, response.data.result];
    }
    if (existedRecord.content === record.content) return [false, existedRecord];

    await this.axiosInstance.put(`/zones/${existedRecord.zone_id}/dns_records/${existedRecord.id}`, record);
    return [true, record];
  }
}
