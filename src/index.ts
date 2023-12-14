import * as dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import { CloudflareAPI } from "./services";
import { readFileSync } from "fs";

async function main() {
  let records: { zone_name: string; name: string; proxied?: boolean }[] = [];
  try {
    records = JSON.parse(readFileSync("domains.json", "utf-8"));
  } catch (error) {
    throw new Error("File JSON không hợp lệ hoặc đường dẫn không chính xác.");
  }

  const cloudflare = new CloudflareAPI({
    apiKey: process.env.CLOUDFLARE_API_KEY,
  });
  const currentIpV4 = await axios.get("https://icanhazip.com", { family: 4 }).then((res) => res.data.trim());
  if (!currentIpV4)
    throw new Error(
      "Không thể lấy địa chỉ IP của máy chủ hiện tại. Hãy thử kiểm tra lại kết nối internet của máy chủ."
    );

  for (const record of records) {
    const zonesResponse = await cloudflare.zone.list({ name: record.zone_name });
    if (!zonesResponse.result.length) {
      console.error("[ERROR]", "Không tìm thấy zone domain:", record.zone_name);
      continue;
    }

    const zone = zonesResponse.result[0];
    const [wasUpserted, recordsResponse] = await cloudflare.dns.upsert(zone.id, {
      ...record,
      type: "A",
      content: currentIpV4,
    });

    if (wasUpserted)
      console.log("[LOG]", "Đã cập nhật địa chỉ IP của domain:", recordsResponse.name, "->", currentIpV4);
  }
}

(() => {
  console.log("[START]", "dts-ip by @matthew", ":D");

  setInterval(async () => {
    try {
      await main();
    } catch (error) {
      console.error("[ERROR]", error.message);
    }
  }, 60 * 1000);
})();
