# Cài đặt:
- Sử dụng npm (nên dùng): xóa yarn.lock ---> npm install -> npm run build ---> npm start
- Sử dụng yarn (hên xui): xóa package-lock.json ---> yarn install --> yarn start

# Test:
- tài khoản người dùng thường: tung1@gmail.com - pass: tung
- Tài khoản quản trị viên: flyingshiet@gmail.com - pass: 123456Q@ 

# Phân chia công việc
## Tùng
- Thiết kế giao diện và chức năng phía web người dùng: trang chủ, danh sách phòng, chi tiết phòng,
## Quang
- Thiết kế giao diện và chức năng phía web quản trị: đăng nhập, đăng kí, quản lý người dùng, quản lý vị trí, quản lý phòng, quản lý đặt phòng, từ chối truy cập...


# Các lỗi chưa sửa
## User Side (Tùng)
- .....
## Admin Side (Quang)
- Server tự đổi role admin sang user khi tạo acc mới. chỉ có edit mới lên admin được
- Tạo phòng và vị trí mới, server nhận nhưng không tự động assign ID => không lưu mới trong server
- API GET đặt phòng kèm id người dùng bị lỗi 404 (trên swagger cũng bị), không lấy danh sách theo người dùng được
- Có một số phòng, vị trí không sửa xóa được (chủ yếu ID nhỏ, chắc là data cứng), up hình cũng lỗi lỗi 403`


# Install Package
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