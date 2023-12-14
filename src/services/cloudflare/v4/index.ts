import { CloudflareV4Dns } from "./dns";
import { CloudflareAPIConfig } from "./interface";
import { CloudflareV4Zone } from "./zone";

export * from "./interface";

export class CloudflareAPI {
  public dns: CloudflareV4Dns = null;
  public zone: CloudflareV4Zone = null;

  constructor(config: CloudflareAPIConfig) {
    this.dns = new CloudflareV4Dns(config);
    this.zone = new CloudflareV4Zone(config);
  }
}
