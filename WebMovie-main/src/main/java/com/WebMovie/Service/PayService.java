package com.WebMovie.Service;

import java.util.List;

import com.WebMovie.Entity.Pay;

public interface PayService {
	Pay addPay(Pay pay);
	List<Pay> geAllPay();
	Pay findPayByIdBooking(Integer id);
}
