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

## Known Bugs & Cons
# Admin Side (Quang)
- Check login và logout dựa vào userData lưu ở local (không an toàn), do ban đầu code không lấy được token, sau này lấy được token rồi thì không đủ thời gian để sửa, và sợ sửa sẽ gây xung đột code trước đó, nên chỉ sử dụng token vào các api upload hình ảnh (@@)
- Error messages chỉ xuất hiện khi submit form, không thể check real-time
- Upload hình ảnh bị lỗi 403 
- Register admin khi đưa vào server tự chuyển role thành USER, chỉ edit user mới lên admin được (xem log trả về xác nhận đã gán role:"ADMIN" gửi lên server nhưng vào server bị lưu thành USER)
# User Side (Tùng)
