/* ============================================================
   FILE NÀY LÀ NƠI BẠN SỬA VOUCHER. (Đây là file duy nhất cần sửa.)

   - Mỗi voucher nằm trong một cặp { }, kết thúc bằng dấu phẩy.
   - platform: "shopee" hoặc "tiktok"
   - title, discount, link: bắt buộc
   - minimum  : đơn tối thiểu            (tùy chọn)
   - maximum  : mức giảm tối đa          (tùy chọn)
   - expires  : hạn dùng (tùy chọn). Có 2 cách:
                  "auto"       = luôn là NGÀY MAI, tự cập nhật theo ngày thật
                  "2026-12-31" = một ngày cố định (năm-tháng-ngày)
                Không ghi dòng này = không hiển thị hạn dùng.
   - used     : số % đã dùng THẬT (0-100) nếu bạn biết (tùy chọn)
   - tag      : nhãn nhỏ, ví dụ "ShopeeVIP" (tùy chọn)
   - featured : true để hiện ở mục "Voucher nổi bật" (tùy chọn)
   - image    : ảnh riêng cho voucher này (tùy chọn)
   - sample   : true = hiện thanh "Đã dùng (minh họa)" tự chạy trên voucher này.
                XÓA DÒNG NÀY khi bạn thay bằng voucher thật (thanh sẽ biến mất).
   - Xóa voucher = xóa cả khối { ... } của nó.
   ============================================================ */

// Tên web
const SITE_NAME = "DealNest";

// Hình dùng chung cho mọi voucher của mỗi sàn.
// Muốn dùng hình của bạn: tải ảnh vào thư mục "images" rồi đổi tên file ở đây.
const PLATFORM_IMAGES = {
  shopee: "images/shopee.svg",
  tiktok: "images/tiktok.svg",
};

// Tiêu đề của khung lưu ý
const NOTES_TITLE = "Lưu ý khi săn mã";

// Các dòng lưu ý. Mỗi dòng nằm trong dấu nháy "...", cách nhau bằng dấu phẩy.
// Thêm, sửa, xóa tùy ý. Để trống danh sách [] thì khung lưu ý sẽ ẩn đi.
const NOTES = [
  "Mã hết rất nhanh nên bạn nhớ ghé lại kiểm tra thường xuyên nhé.",
  "Đây là mã ẩn, nên nếu bấm vào mà chỉ ra trang sản phẩm thì nghĩa là mã đã hết. Bạn cứ thử sang các mã khác nhé.",
  "Khung giờ dễ săn mã nhất là 0h, 9h, 12h, 15h, 18h và 21h mỗi ngày, trùng với các khung giờ flash sale của Shopee (khung 0h thường có nhiều ưu đãi nhất). Lịch này có thể thay đổi vào các ngày sale lớn, bạn nên xem lại trên ứng dụng Shopee.",
  "Bạn nên kiên nhẫn vì mã hết rất nhanh. Mỗi ngày mã sẽ mở ở những khung giờ khác nhau tùy từng tài khoản, nên cứ kiên trì thử nhiều lần nhé.",
];

// ---------- Khung "Số lượng mã đã nhận" ----------
// simulated: true  = số minh họa, tự tăng theo thời gian thật (mọi người cùng thấy một số,
//                    số chỉ tăng chứ không reset khi tải lại trang). Chữ "(số liệu minh họa)" sẽ hiện kèm.
// simulated: false = hiện đúng số bạn tự ghi ở "value" bên dưới (dùng khi bạn có số thật).
// since: thời điểm bắt đầu đếm. NHỚ ĐỔI thành giờ bạn đưa web lên mạng để số bắt đầu đúng từ 50 / 500.
// everyMinutes: [ít nhất, nhiều nhất] số PHÚT giữa hai lần tăng. add: [ít nhất, nhiều nhất] số mã mỗi lần tăng.
const CLAIMED = {
  title: "Số lượng mã đã nhận",
  simulated: true,
  since: "2026-11-17T15:00:00+07:00",
  normal: { label: "Mã thường", start: 500, everyMinutes: [20, 60],   add: [1, 3], value: 0 },
  hot:    { label: "Mã hot",    start: 50,  everyMinutes: [120, 300], add: [1, 3], value: 0 },
};

const VOUCHERS = [

  // ===== VOUCHER NỔI BẬT =====
  {
    platform: "shopee",
    title: "Voucher Shopee giảm 500K",
    discount: "Giảm 500K",
    minimum: "0đ",
    expires: "auto",
    link: "https://shopee.vn",
    featured: true,
    sample: true,
  },
  {
    platform: "tiktok",
    title: "Voucher TikTok Shop giảm 500K",
    discount: "Giảm 500K",
    minimum: "0đ",
    expires: "auto",
    link: "https://www.tiktok.com/shop",
    featured: true,
    sample: true,
  },
  {
    platform: "shopee",
    title: "Voucher ShopeeVIP giảm 50%",
    discount: "Giảm 50%",
    minimum: "0đ",
    maximum: "500K",
    expires: "auto",
    tag: "ShopeeVIP",
    link: "https://shopee.vn",
    featured: true,
    sample: true,
  },
  {
    platform: "tiktok",
    title: "Voucher TikTok Shop giảm 800K",
    discount: "Giảm 800K",
    minimum: "0đ",
    expires: "auto",
    link: "https://www.tiktok.com/shop",
    featured: true,
    sample: true,
  },

  // ===== VOUCHER SHOPEE =====
  {
    platform: "shopee",
    title: "Giảm 30K cho đơn từ 150K",
    discount: "Giảm 30K",
    minimum: "150K",
    link: "https://shopee.vn",
    sample: true,
  },
  {
    platform: "shopee",
    title: "Giảm 50K cho đơn từ 300K",
    discount: "Giảm 50K",
    minimum: "300K",
    link: "https://shopee.vn",
    sample: true,
  },
  {
    platform: "shopee",
    title: "Giảm 100K cho đơn từ 500K",
    discount: "Giảm 100K",
    minimum: "500K",
    link: "https://shopee.vn",
    sample: true,
  },
  {
    platform: "shopee",
    title: "Miễn phí vận chuyển",
    discount: "Freeship",
    minimum: "0đ",
    maximum: "30K",
    link: "https://shopee.vn",
    sample: true,
  },
  {
    platform: "shopee",
    title: "Hoàn xu 10% cho đơn từ 100K",
    discount: "Hoàn 10% xu",
    minimum: "100K",
    maximum: "100K",
    link: "https://shopee.vn",
    sample: true,
  },
  {
    platform: "shopee",
    title: "Giảm 15% tối đa 70K",
    discount: "Giảm 15%",
    minimum: "200K",
    maximum: "70K",
    link: "https://shopee.vn",
    sample: true,
  },
  {
    platform: "shopee",
    title: "Giảm 200K cho đơn từ 1 triệu",
    discount: "Giảm 200K",
    minimum: "1.000K",
    link: "https://shopee.vn",
    sample: true,
  },
  {
    platform: "shopee",
    title: "Giảm 20% tối đa 150K",
    discount: "Giảm 20%",
    minimum: "400K",
    maximum: "150K",
    link: "https://shopee.vn",
    sample: true,
  },

  // ===== VOUCHER TIKTOK SHOP =====
  {
    platform: "tiktok",
    title: "Giảm 20K cho đơn từ 100K",
    discount: "Giảm 20K",
    minimum: "100K",
    link: "https://www.tiktok.com/shop",
    sample: true,
  },
  {
    platform: "tiktok",
    title: "Giảm 40K cho đơn từ 250K",
    discount: "Giảm 40K",
    minimum: "250K",
    link: "https://www.tiktok.com/shop",
    sample: true,
  },
  {
    platform: "tiktok",
    title: "Giảm 100K cho đơn từ 600K",
    discount: "Giảm 100K",
    minimum: "600K",
    link: "https://www.tiktok.com/shop",
    sample: true,
  },
  {
    platform: "tiktok",
    title: "Miễn phí vận chuyển",
    discount: "Freeship",
    minimum: "0đ",
    maximum: "25K",
    link: "https://www.tiktok.com/shop",
    sample: true,
  },
  {
    platform: "tiktok",
    title: "Giảm 10% tối đa 50K",
    discount: "Giảm 10%",
    minimum: "150K",
    maximum: "50K",
    link: "https://www.tiktok.com/shop",
    sample: true,
  },
  {
    platform: "tiktok",
    title: "Giảm 25% tối đa 120K",
    discount: "Giảm 25%",
    minimum: "300K",
    maximum: "120K",
    link: "https://www.tiktok.com/shop",
    sample: true,
  },
  {
    platform: "tiktok",
    title: "Giảm 300K cho đơn từ 1,5 triệu",
    discount: "Giảm 300K",
    minimum: "1.500K",
    link: "https://www.tiktok.com/shop",
    sample: true,
  },
  {
    platform: "tiktok",
    title: "Giảm 15% cho khách hàng mới",
    discount: "Giảm 15%",
    minimum: "0đ",
    maximum: "80K",
    link: "https://www.tiktok.com/shop",
    sample: true,
  },
];
