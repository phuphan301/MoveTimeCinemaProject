package com.WebMovie.Service;

import java.util.List;

import com.WebMovie.Entity.Voucher;

public interface VoucherService {
    List<Voucher> getAll();
    Voucher addVoucher(Voucher voucher);
    Voucher updateVoucher(Voucher voucher, Integer id);
    void updateStauts(Integer id);
    Voucher getVoucherById(Integer id);
}
