import axios, { AxiosInstance } from "axios";
import { CloudflareAPIConfig, ICloudflareListResponse, IQueryZoneParams, IZone } from "./interface";

export class CloudflareV4Zone {
  protected axiosInstance: AxiosInstance = null;
  private path = "/zones";

  constructor(config: CloudflareAPIConfig) {
    this.axiosInstance = axios.create({
      baseURL: "https://api.cloudflare.com/client/v4" + this.path,
      headers: {
        Authorization: "Bearer " + config.apiKey,
      },
    });
  }

  async list(query?: IQueryZoneParams): Promise<ICloudflareListResponse<IZone[]>> {
    const response = await this.axiosInstance.get("/", { params: query });
    return response.data;
  }
}
