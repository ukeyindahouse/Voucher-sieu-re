# DealNest - Trang voucher Shopee & TikTok Shop

Trang web tĩnh (HTML/CSS/JS thuần), không cần cài đặt, không cần build, không cần Supabase. Tải lên GitHub, bật Pages là chạy.

Mỗi nút **Get Voucher** mở đúng link bạn nhập, không đổi, không xoay vòng.

## Đưa web lên mạng (làm 1 lần, khoảng 3 phút)

1. Vào github.com, bấm **+ -> New repository**. Đặt tên (ví dụ `voucher`), chọn **Public**, bấm **Create repository**.
2. Giải nén file zip. Mở thư mục cho đến khi thấy `index.html`. Chọn tất cả file và thư mục bên trong (Ctrl+A), kéo thả vào trang GitHub (mục "uploading an existing file"), rồi bấm **Commit changes**.
3. Vào **Settings -> Pages**. Ở mục **Build and deployment**:
   - **Source**: chọn **Deploy from a branch**
   - **Branch**: chọn **main** và thư mục **/ (root)**, bấm **Save**
4. Chờ 1 đến 2 phút. Tải lại trang Pages, GitHub sẽ hiện link web của bạn:
   `https://TÊN-GITHUB.github.io/TÊN-KHO/`

## Thêm / sửa / xóa voucher

1. Trên GitHub mở file `vouchers.js`, bấm biểu tượng **cây bút (Edit)**.
2. Sửa nội dung giữa các cặp `{ }`. Mỗi voucher là một khối, kết thúc bằng dấu phẩy:

```js
{
  platform: "shopee",          // "shopee" hoặc "tiktok"
  title: "Tên voucher",
  discount: "Giảm 50K",
  minimum: "300K",             // đơn tối thiểu (tùy chọn)
  maximum: "100K",             // mức giảm tối đa (tùy chọn)
  expires: "auto",             // "auto" = luôn là ngày mai (tự cập nhật), hoặc "2026-12-31" (tùy chọn)
  used: 40,                    // % đã dùng THẬT, nếu bạn biết (tùy chọn)
  tag: "ShopeeVIP",            // nhãn nhỏ (tùy chọn)
  link: "https://link-cua-ban",
  featured: true,              // hiện ở mục "Voucher nổi bật" (tùy chọn)
},
```

3. Bấm **Commit changes**. Khoảng 1 phút sau web tự cập nhật (nhấn Ctrl+F5 để xem bản mới).

Nếu web trống hoặc báo lỗi đọc `vouchers.js`: thường do thiếu dấu phẩy, dấu ngoặc hoặc dấu nháy. Hãy kiểm tra lại khối vừa sửa.

## Khung "Lưu ý khi săn mã"

Nằm ngay phía trên mục Voucher nổi bật. Nội dung do bạn tự sửa trong file `vouchers.js`, ở phần `NOTES`: mỗi dòng nằm trong dấu nháy `"..."`, cách nhau bằng dấu phẩy. Muốn thêm một lưu ý thì thêm một dòng mới, muốn bỏ thì xóa dòng đó. Đổi tiêu đề ở `NOTES_TITLE`. Để danh sách trống `[]` thì khung tự ẩn.

Khung giờ Shopee trong lưu ý (0h, 9h, 12h, 15h, 18h, 21h) lấy từ blog của Shopee. Vào các ngày sale lớn như 9.9, 11.11, 12.12 Shopee có thể thêm khung giờ khác, bạn nhớ xem lại trên ứng dụng.

## Khung "Số lượng mã đã nhận"

Hiện hai con số: **Mã thường** (bắt đầu từ 500) và **Mã hot** (bắt đầu từ 50).
- Mã thường: cứ khoảng 20 đến 60 phút tăng thêm 1 đến 3.
- Mã hot: cứ khoảng 2 đến 5 tiếng tăng thêm 1 đến 3.

Số được tính từ đồng hồ thật nên **mọi người vào đều thấy cùng một số, và số chỉ tăng, không reset** khi tải lại trang hay khi người khác vào.

Chỉnh trong `vouchers.js`, phần `CLAIMED`:
- `since`: thời điểm bắt đầu đếm. **Hãy đổi thành giờ bạn đưa web lên mạng** (ví dụ `"2026-11-20T09:00:00+07:00"`) để số bắt đầu đúng từ 500 và 50. Trước thời điểm này trang hiện đúng số khởi điểm.
- `start`, `everyMinutes`, `add`: số khởi điểm, khoảng phút giữa hai lần tăng, và số mã mỗi lần tăng.
- `simulated: true`: số minh họa (có chữ "(số liệu minh họa)" bên cạnh). Khi bạn có số thật, đặt `simulated: false` rồi ghi số vào `value` của từng loại, chữ minh họa sẽ biến mất.

Lưu ý: nếu bạn sửa `since`, `start`, `everyMinutes` hoặc `add` thì cả dãy số được tính lại, con số hiện tại sẽ thay đổi.

## Thanh "Đã dùng" minh họa

Các voucher có sẵn đều có dòng `sample: true`, nên hiện thanh **Đã dùng (minh họa)**. Thanh này tăng 1% sau mỗi vài phút (khoảng 2 đến 5 phút, mỗi voucher một nhịp riêng) trong khoảng 50% đến 99%, rồi quay về khoảng 50% khi chạm mốc cao nhất. Đây chỉ là hiệu ứng giao diện, không phải số liệu thật.

Khi bạn thay bằng voucher thật, hãy **xóa dòng `sample: true`**. Lúc đó thanh minh họa biến mất. Nếu bạn biết số lượng đã dùng thật, thêm dòng `used: 40` (nghĩa là 40%) thì thanh sẽ hiện đúng con số đó.

## Hạn dùng

- `expires: "auto"`: luôn hiện **ngày mai**, tự cập nhật theo ngày thật (các voucher nổi bật dùng cách này).
- `expires: "2026-12-31"`: ngày cố định. Qua ngày đó voucher hiện "Hết hạn".
- Không ghi dòng `expires`: không hiện hạn dùng (các voucher thường).

## Đổi hình Shopee / TikTok Shop

Mọi voucher của mỗi sàn dùng chung một hình trong thư mục `images/`. Hai hình hiện có là hình đơn giản tạo sẵn, không phải logo chính thức.

Muốn dùng hình của bạn: mở thư mục `images` trên GitHub, **Add file -> Upload files**, tải ảnh lên (khoảng 5:2, ví dụ 1000x400). Sau đó mở `vouchers.js`, đổi tên file ở phần `PLATFORM_IMAGES`.

Muốn một voucher có hình riêng: thêm dòng `image: "images/ten-anh.png",` vào khối voucher đó.

## Đổi tên web

Sửa dòng `SITE_NAME` ở đầu `vouchers.js`. Tiêu đề thẻ trình duyệt đổi theo.

## An toàn

Chỉ nhận link bắt đầu bằng `http://` hoặc `https://`. Link trống hoặc sai thì nút hiện "Chưa có link". Voucher đã quá ngày `expires` hiện "Hết hạn".
