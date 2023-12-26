package com.WebMovie.ImplService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Voucher;
import com.WebMovie.Repository.VoucherRepository;
import com.WebMovie.Service.VoucherService;

@Service
public class VoucherServiceImpl implements VoucherService {

	@Autowired
	VoucherRepository voucherRepository;

	@Override
	public List<Voucher> getAll() {
		// TODO Auto-generated method stub
		return voucherRepository.findAll();
	}

	@Override
	public Voucher addVoucher(Voucher voucher) {
		// TODO Auto-generated method stub
		voucher.setSTATUS(true);
		return voucherRepository.save(voucher);
	}

	@Override
	public Voucher updateVoucher(Voucher voucher, Integer id) {
		// TODO Auto-generated method stub
		voucher.setSTATUS(true);
		return voucherRepository.save(voucher);
	}

	@Override
	public void updateStauts(Integer id) {
		// TODO Auto-generated method stub

	}

	@Override
	public Voucher getVoucherById(Integer id) {
		// TODO Auto-generated method stub
		return voucherRepository.findById(id).get();
	}
}
