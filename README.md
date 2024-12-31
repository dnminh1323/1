# Thiết lập thẻ UTM cho Google và Facebook Ads

## Thiết lập thẻ UTM trong Bitrix24

### Ý nghĩa của các thẻ UTM

- **utm_source**: Cho biết khách truy cập đến từ đâu. Ví dụ: email hoặc dịch vụ quảng cáo.
- **utm_content**: Phân biệt các nội dung hoặc liên kết tương tự trong cùng một quảng cáo.
- **{campaignid}**: Đánh dấu chiến dịch mà quảng cáo của bạn xuất hiện.
- **{adgroupid}**: Hiển thị nhóm quảng cáo mà quảng cáo của bạn thuộc về.
- **{targetid}**: Xác định từ khóa.

Bạn có thể thiết lập thẻ UTM cho quảng cáo Facebook theo cách tương tự.

## Thiết lập thẻ UTM trong Google Ads

Để gửi dữ liệu chiến dịch đến tài khoản của bạn, hãy thiết lập các thẻ UTM thích hợp.

Khi tạo chiến dịch quảng cáo mới, nhập địa chỉ website của bạn với các thẻ UTM chính xác vào trường Final URL:
```
https://example.com/?utm_source=google&utm_content=cid|{campaignid}|gid|{adgroupid}|kwid|{targetid}
```

Bạn cũng có thể tạo mẫu theo dõi để áp dụng cùng một URL cuối cùng với thẻ UTM cho nhóm quảng cáo, chiến dịch hoặc tài khoản. Mẫu sẽ tự động áp dụng cho tất cả quảng cáo, tùy thuộc vào cài đặt của nó.

Trong trường mẫu theo dõi, chỉ định liên kết với thẻ UTM của bạn:
```
{lpurl}?utm_source=google&utm_content=cid|{campaignid}|gid|{adgroupid}|kwid|{targetid}
```

## Thiết lập thẻ UTM trong Facebook

Thẻ UTM trong quảng cáo Facebook truyền dữ liệu để xây dựng báo cáo chi phí quảng cáo chi tiết. Thiết lập thẻ UTM trong quá trình tạo quảng cáo trong Facebook Ads Manager.

1. Chỉ định địa chỉ trang web của bạn và nhấp vào Build a URL parameter.
2. Điền vào các trường tương ứng.
3. Nhấp vào Apply, và các lượt nhấp vào quảng cáo của bạn sẽ bao gồm các tham số cần thiết để phân tích chi phí quảng cáo chi tiết.

## Tóm tắt

- Để phân tích chi phí quảng cáo chính xác, hãy thiết lập thẻ UTM trong Bitrix24 và các dịch vụ quảng cáo như Google Ads và Facebook.
- Trong Bitrix24, kết nối Google Ads và Facebook như các nguồn lưu lượng truy cập, sao chép thẻ UTM và thêm chúng vào địa chỉ website của bạn.
- Đối với Google Ads, bao gồm thẻ UTM trong trường Final URL hoặc sử dụng mẫu theo dõi để áp dụng cùng một URL cuối cùng với thẻ UTM cho nhóm quảng cáo, chiến dịch hoặc tài khoản.
- Trong Facebook Ads Manager, thiết lập thẻ UTM trong quá trình tạo quảng cáo để đảm bảo báo cáo chi phí quảng cáo chi tiết.
