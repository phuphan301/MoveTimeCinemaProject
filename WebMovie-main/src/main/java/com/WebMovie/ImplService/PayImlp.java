package com.WebMovie.ImplService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Pay;
import com.WebMovie.Repository.PayRepository;
import com.WebMovie.Service.PayService;

@Service
public class PayImlp implements PayService{

	@Autowired
	PayRepository payRepository;

	@Override
	public Pay addPay(Pay pay) {
		// TODO Auto-generated method stub
		return payRepository.save(pay);
	}

	@Override
	public List<Pay> geAllPay() {
		// TODO Auto-generated method stub
		return payRepository.findAll();
	}

	@Override
	public Pay findPayByIdBooking(Integer id) {
		// TODO Auto-generated method stub
		return payRepository.findById(id).get();
	}

}
