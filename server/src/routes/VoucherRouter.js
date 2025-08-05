const express = require('express');
const router = express.Router();

const VoucherController = require('../controller/VoucherController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const ROLE = require('../constants/role');


// Lấy danh sách tất cả voucher (ai cũng xem được)
router.get('/get-all', VoucherController.getAllVoucher);

//Lấy chi tiết một voucher (ai cũng xem được)
router.get('/get-detail/:id', VoucherController.getDetailVoucher);

// Tạo voucher (chỉ ADMIN hoặc SYSTEM mới được tạo)
router.post(
    '/create',
    authenticate,
    authorize(ROLE.ADMIN, ROLE.SYSTEM),
    VoucherController.createVoucher
);

//Cập nhật voucher (chỉ ADMIN hoặc SYSTEM được sửa)
router.put(
    '/update/:id',
    authenticate,
    authorize(ROLE.ADMIN, ROLE.SYSTEM),
    VoucherController.updateVoucher
);

// Xoá voucher (chỉ ADMIN hoặc SYSTEM được xoá)
router.delete(
    '/delete/:id',
    authenticate,
    authorize(ROLE.ADMIN, ROLE.SYSTEM),
    VoucherController.deleteVoucher
);

// Tạo hàng loạt voucher (chỉ ADMIN hoặc SYSTEM)
router.post(
    '/generate',
    authenticate,
    authorize(ROLE.ADMIN, ROLE.SYSTEM),
    VoucherController.generateVouchers
);


module.exports = router;
