## How to run
#Step 1:
- Sử dụng yarn: xóa package-lock.json ---> yarn install --> yarn start
- Sử dụng npm: xóa yarn.lock ---> npm install ---> npm start

#Step 2:
- Chạy live scss compiler để cập nhật style.css

## Install Package
1. TailwindCSS
2. React-router-dom
3. Redux toolkit
4. React-redux
5. antd (andesign)
6. styled-components
7. @types/styled-components
8. Axios
9. classnames
10. qs
11. react-hook-form
12. zod
13. @hookform/resolvers
14. @types/node (phục vụ import)
15. scss (cài extension live scss compiler ra css ở src/assets/style.css)
16. react-toastify
17. swiper
18. animate.css
19. fontawesome
20. moment
21. google-map-react

# Known Bugs & Cons
## Admin Side (Quang)
- Check login và logout dựa vào user data lưu ở local (không an toàn), do ban đầu mình code không lấy được token, sau này lấy được token thì sợ sửa sẽ gây xung đột các code trước đó nên thôi lỡ rồi @@
- Error messages chỉ xuất hiện khi submit form, không thể check ngay tại thời điểm nhập
- Click vào các nút thông tin chi tiết hoặc sửa, đôi lúc modal bị nhấp nháy 2 lần
- Bị lỗi 403 ngăn không cho xóa một số người dùng, vị trí hoặc phòng (thường có ID nhỏ). Chắc do config bên server. Mình cho disable nút sửa / xóa khi ID <= 10
- Register admin khi đưa vào server tự chuyển role thành USER, chỉ khi edit user (PUT request) mới lên admin được
- Server không gán ID cho vị trí mới vừa được tạo (ID= undefined) => Không thêm vị trí mới được
- Các api upload ảnh đều bị dính lỗi 403 mặc dù mình thêm 2 token rồi 
