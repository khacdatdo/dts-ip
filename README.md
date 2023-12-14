# Dynamic to Static IP

## Đây là gì?
Đây là service có khả năng tự động cập nhật địa chỉ IP của bản ghi DNS trên Cloudflare, nó được sử dụng để giữ cho địa chỉ IP của máy chủ luôn được trỏ đến địa chỉ **IP Public** của mạng dù cho mạng đó không có địa chỉ IP tĩnh.

## Cách sử dụng
Để có thể sử dụng service này, trước hết bạn phải có một tài khoản [Cloudflare](https://cloudflare.com) và tên miền đã được trỏ về tài khoản này.

Tiếp đó, bạn cần tạo một [API Token](https://dash.cloudflare.com/profile/api-tokens) có quyền `Zone.Zone.Read` và `Zone.DNS.Edit`, phần **Zone Resources** cần bao gồm domain được sử dụng bởi service.

#### From source
Sau khi đã tạo được API Token, bạn hãy thêm nó vào file `.env`:
```ini
CLOUDFLARE_API_KEY=token_here
```

Tạo một file `domains.json` ở thư mục gốc của repo, nội dung của file có dạng như sau:
```js
[
    {
        // required -- top-level domain
        "zone_name": "matthew.id.vn",

        // required -- domain mà bạn muốn service cập nhật địa chỉ IP
        "name": "sub.matthew.id.vn",

        // optional -- có sử dụng tính năng Proxy của Cloudflare hay không?
        // mặc định là `false`
        "proxied": true
    }
    // ...
]
```

Giờ hãy mở terminal ở thư mục gốc của repo và chạy lệnh:
```bash
npm install
npm run build
npm start
```


#### Docker
Service này cũng đã được build thành Docker image, bạn có thể sử dụng image này nhé.
[=> Click để đi tới trang Docker Image](https://hub.docker.com/r/khacdatdo/dts-ip)
