// ------------------------qlts--------------------
document.getElementById("btnKetQua").onclick = function () {
    const diemChuan = document.getElementById("diemChuan").value * 1;
    const diemMon1 = document.getElementById("diemMon1").value * 1;
    const diemMon2 = document.getElementById("diemMon2").value * 1;
    const diemMon3 = document.getElementById("diemMon3").value * 1;
    const khuVuc = document.getElementById("khuVuc").value;
    const doiTuong = document.getElementById("doiTuong").value;
    // tính điểm ưu tiên khu vực
    let diemUuTienKhuVuc = 0;
    if (khuVuc === "A") {
      diemUuTienKhuVuc = 2;
    } else if (khuVuc === "B") {
      diemUuTienKhuVuc = 1;
    } else if (khuVuc === "C") {
      diemUuTienKhuVuc = 0.5;
    }
  
    // tính điểm ưu tiên đối tượng
    let diemUuTienDoiTuong = 0;
    if (doiTuong === "1") {
      diemUuTienDoiTuong = 2.5;
    } else if (doiTuong === "2") {
      diemUuTienDoiTuong = 1.5;
    } else if (doiTuong === "3") {
      diemUuTienDoiTuong = 1;
    }
  
    // kiểm tra dk nếu 1 môn 0 điểm
    if (diemMon1 === 0 || diemMon2 === 0 || diemMon3 === 0) {
      document.getElementById("btnResult").innerHTML =
        "Thí sinh bị rớt do có môn bị điểm 0.";
      return;
    }
  
    // tổng
    let tongDiem =
      diemMon1 + diemMon2 + diemMon3 + diemUuTienKhuVuc + diemUuTienDoiTuong;
  
    // kq
    if (tongDiem >= diemChuan) {
      document.getElementById("btnResult").innerHTML =
        "Thí sinh đỗ với tổng điểm đạt được là: " + tongDiem;
    } else {
      document.getElementById("btnResult").innerHTML =
        "Thí sinh rớt với tổng điểm đạt được là: " + tongDiem;
    }
  };
  
  //------------------Tiền điện----------
  document.getElementById("btnKetQua2").onclick = function () {
    const ten = document.getElementById("ten").value;
    const soKw = document.getElementById("soKw").value * 1;
    if (ten === "" || isNaN(soKw) || soKw <= 0) {
      document.getElementById("btnResult2").innerHTML =
        "Vui lòng nhập tên và số Kw hợp lệ.";
      return;
    }
    let tienDien = 0;
    if (soKw <= 50) {
      tienDien = soKw * 500;
    } else if (soKw <= 100) {
      tienDien = 50 * 500 + (soKw - 50) * 650;
    } else if (soKw <= 200) {
      tienDien = 50 * 500 + 50 * 650 + (soKw - 100) * 850;
    } else if (soKw <= 350) {
      tienDien = 50 * 500 + 50 * 650 + 100 * 850 + (soKw - 200) * 1100;
    } else {
      tienDien =
        50 * 500 + 50 * 650 + 100 * 850 + 150 * 1100 + (soKw - 350) * 1300;
    }
  
    // Hiển thị kết quả
    document.getElementById(
      "btnResult2"
    ).innerHTML = `Khách hàng ${ten} phải trả: ${tienDien.toLocaleString()} VND`;
  };
  
  // -----------------tính thuế---------------------------------------
  document.getElementById("btnKetQua3").onclick = function () {
    const hoTen = document.getElementById("hoTen").value;
    const tongThuNhap = parseFloat(document.getElementById("tongThuNhap").value);
    const soNguoiPhuThuoc = parseInt(
      document.getElementById("soNguoiPhuThuoc").value
    );
    if (
      hoTen === "" ||
      isNaN(tongThuNhap) ||
      tongThuNhap <= 0 ||
      isNaN(soNguoiPhuThuoc) ||
      soNguoiPhuThuoc < 0
    ) {
      document.getElementById("btnResult3").innerHTML =
        "Vui lòng nhập đầy đủ thông tin hợp lệ.";
      return;
    }
    // Khấu trừ miễn thuế
    const thuNhapChiuThue = tongThuNhap - 4e6 - soNguoiPhuThuoc * 1.6e6;
    // Các ngưỡng thuế và tỷ lệ tương ứng
    const mucThue = [
      { gioiHan: 60e6, tyLe: 0.05 },
      { gioiHan: 120e6, tyLe: 0.1 },
      { gioiHan: 210e6, tyLe: 0.15 },
      { gioiHan: 384e6, tyLe: 0.2 },
      { gioiHan: 624e6, tyLe: 0.25 },
      { gioiHan: 960e6, tyLe: 0.3 },
      { gioiHan: Infinity, tyLe: 0.35 },
    ];
  
    let thuePhaiNop = 0;
    let thuNhapConLai = thuNhapChiuThue;
    for (let i = 0; i < mucThue.length; i++) {
      if (thuNhapConLai <= 0) break;
  
      const mucHienTai = mucThue[i];
      const mucGioiHan = mucHienTai.gioiHan;
      const tyLeThue = mucHienTai.tyLe;
  
      const mucThueApDung = Math.min(
        thuNhapConLai,
        mucGioiHan - (mucThue[i - 1]?.gioiHan || 0)
      );
      thuePhaiNop += mucThueApDung * tyLeThue;
  
      thuNhapConLai -= mucThueApDung;
    }
  
    // Định dạng hiển thị kết quả
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  
    document.getElementById(
      "btnResult3"
    ).innerHTML = `Khách hàng ${hoTen} phải nộp thuế: ${formatter.format(
      thuePhaiNop
    )}`;
  };
  
  //-----------------tính cáp---------
  function toggleSoKetNoi() {
    const loaiKhachHang = document.getElementById("loaiKhachHang").value;
    const soKetNoi = document.getElementById("soKetNoi");
  
    // Bật ô nhập "Số Kết Nối" nếu khách hàng là doanh nghiệp
    if (loaiKhachHang === "doanhNghiep") {
      soKetNoi.disabled = false;
      soKetNoi.placeholder = "Số Kết Nối (Chỉ doanh nghiệp)";
    } else {
      soKetNoi.disabled = true;
      soKetNoi.value = ""; // Reset giá trị khi bị tắt
      soKetNoi.placeholder = "Số Kết Nối";
    }
  }
  
  document.getElementById("btnKetQua4").onclick = function () {
    const maKhachHang = document.getElementById("maKhachHang").value;
    const loaiKhachHang = document.getElementById("loaiKhachHang").value;
    const soKetNoi = document.getElementById("soKetNoi").value * 1 || 0;
    const soKenhCaoCap = document.getElementById("soKenhCaoCap").value * 1;
  
    if (
      !maKhachHang ||
      !loaiKhachHang ||
      isNaN(soKenhCaoCap) ||
      soKenhCaoCap < 0
    ) {
      document.getElementById("btnResult4").innerText =
        "Vui lòng nhập đầy đủ thông tin hợp lệ.";
      return;
    }
  
    let phiXuLyHoaDon = 0;
    let phiDichVuCoBan = 0;
    let phiKenhCaoCap = 0;
  
    if (loaiKhachHang === "nhaDan") {
      // Tính tiền cho khách hàng Nhà Dân
      phiXuLyHoaDon = 4.5;
      phiDichVuCoBan = 20.5;
      phiKenhCaoCap = soKenhCaoCap * 7.5;
    } else if (loaiKhachHang === "doanhNghiep") {
      // Tính tiền cho khách hàng Doanh Nghiệp
      phiXuLyHoaDon = 15;
      if (soKetNoi <= 10) {
        phiDichVuCoBan = 75;
      } else {
        phiDichVuCoBan = 75 + (soKetNoi - 10) * 5;
      }
      phiKenhCaoCap = soKenhCaoCap * 50;
    }
  
    // Tính tổng chi phí
    const tongTien = phiXuLyHoaDon + phiDichVuCoBan + phiKenhCaoCap;
  
    // Định dạng tiền tệ
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "USD",
    });
  
    document.getElementById(
      "btnResult4"
    ).innerText = `Mã Khách Hàng ${maKhachHang} - Tổng Tiền Cần Thanh Toán: ${formatter.format(
      tongTien
    )}`;
  };
  